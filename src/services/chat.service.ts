import { env, getAssistantEndpoint } from '@/config/env';
import type {
  ApiResponse,
  ChatRequestDto,
  ChatResponseDto,
  StreamChatCallbacks,
} from '@/types/chat';
import { parseSseBlock } from '@/utils/sse';

const CHAT_STREAM_PATH = '/api/chat/stream';

const FRIENDLY_UNAVAILABLE_MSG =
  'Trợ lý AI hiện đang tạm gián đoạn. Bạn vui lòng thử lại sau ít phút hoặc liên hệ trực tiếp với Huy ở mục Contact nhé!';

export async function streamPortfolioChat(
  payload: ChatRequestDto,
  callbacks: StreamChatCallbacks,
  signal?: AbortSignal
): Promise<void> {
  const url = getAssistantEndpoint(CHAT_STREAM_PATH);
  if (!url) {
    console.error('[AI Assistant] Missing VITE_ASSISTANT_API_URL in environment.');
    callbacks.onError(FRIENDLY_UNAVAILABLE_MSG);
    return;
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'text/event-stream',
  };

  if (env.assistantApiKey) {
    headers['X-API-Key'] = env.assistantApiKey;
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return;
    }
    console.error('[AI Assistant] Network/CORS error:', err);
    callbacks.onError(
      'Không thể kết nối tới trợ lý AI lúc này. Bạn kiểm tra lại kết nối mạng và thử lại nhé!'
    );
    return;
  }

  if (!response.ok) {
    let errorMessage =
      'Rất tiếc, trợ lý AI đang gặp chút sự cố. Bạn thử gửi lại câu hỏi sau giây lát nhé!';
    try {
      const errBody = (await response.json()) as ApiResponse<null>;
      console.error('[AI Assistant] API error:', response.status, errBody);

      if (response.status === 401 || response.status === 403) {
        errorMessage = FRIENDLY_UNAVAILABLE_MSG;
      } else if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        errorMessage = retryAfter
          ? `Bạn đang hỏi hơi nhanh một chút. Chờ khoảng ${retryAfter} giây rồi thử lại nhé!`
          : 'Bạn đang hỏi hơi nhanh một chút. Chờ ít giây rồi thử lại nhé!';
      } else if (response.status === 400) {
        errorMessage = 'Câu hỏi chưa hợp lệ. Bạn thử nhập lại ngắn gọn hơn nhé!';
      }
    } catch {
      console.error('[AI Assistant] API error status:', response.status);
      if (response.status === 401 || response.status === 403) {
        errorMessage = FRIENDLY_UNAVAILABLE_MSG;
      }
    }
    callbacks.onError(errorMessage);
    return;
  }

  if (!response.body) {
    console.error('[AI Assistant] ReadableStream not supported on response.body');
    callbacks.onError(
      'Trình duyệt hiện tại không hỗ trợ hiển thị phản hồi trực tiếp. Bạn thử dùng trình duyệt khác nhé!'
    );
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  let accumulatedText = '';
  let finished = false;

  const handleEvent = (eventName: string, rawData: string) => {
    if (eventName === 'token') {
      try {
        const parsed = JSON.parse(rawData) as { token?: string };
        if (typeof parsed.token === 'string' && parsed.token.length > 0) {
          accumulatedText += parsed.token;
          callbacks.onToken(parsed.token);
        }
      } catch {
        if (rawData) {
          accumulatedText += rawData;
          callbacks.onToken(rawData);
        }
      }
      return;
    }

    if (eventName === 'done') {
      finished = true;
      try {
        const parsed = JSON.parse(rawData) as ApiResponse<ChatResponseDto>;
        if (parsed.success && parsed.data) {
          callbacks.onDone(parsed.data);
        } else {
          callbacks.onError(parsed.message || 'Không nhận được phản hồi hợp lệ.');
        }
      } catch {
        callbacks.onDone({
          sessionId: payload.sessionId,
          reply: accumulatedText,
          sources: [],
          isCached: false,
        });
      }
      return;
    }

    if (eventName === 'error') {
      finished = true;
      console.error('[AI Assistant] Stream error event:', rawData);
      callbacks.onError(
        'Rất tiếc, trợ lý AI gặp chút trục trặc khi trả lời. Bạn thử hỏi lại nhé!'
      );
    }
  };

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const blocks = buffer.split(/\r?\n\r?\n/);
      buffer = blocks.pop() ?? '';

      for (const block of blocks) {
        const parsedBlock = parseSseBlock(block);
        if (parsedBlock) {
          handleEvent(parsedBlock.event, parsedBlock.data);
        }
      }
    }

    buffer += decoder.decode();
    if (buffer.trim()) {
      const parsedBlock = parseSseBlock(buffer);
      if (parsedBlock) {
        handleEvent(parsedBlock.event, parsedBlock.data);
      }
    }

    if (!finished) {
      callbacks.onDone({
        sessionId: payload.sessionId,
        reply: accumulatedText,
        sources: [],
        isCached: false,
      });
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return;
    }
    console.error('[AI Assistant] Stream read interrupted:', err);
    callbacks.onError(
      'Kết nối hơi chập chờn nên câu trả lời bị gián đoạn. Bạn thử hỏi lại nhé!'
    );
  } finally {
    reader.releaseLock();
  }
}
