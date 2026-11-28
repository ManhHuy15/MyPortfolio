import { env, getAssistantEndpoint } from '@/config/env';
import type {
  ApiResponse,
  ChatRequestDto,
  ChatResponseDto,
  StreamChatCallbacks,
} from '@/types/chat';
import { parseSseBlock } from '@/utils/sse';

const CHAT_STREAM_PATH = '/api/chat/stream';

export async function streamPortfolioChat(
  payload: ChatRequestDto,
  callbacks: StreamChatCallbacks,
  signal?: AbortSignal
): Promise<void> {
  const url = getAssistantEndpoint(CHAT_STREAM_PATH);
  if (!url) {
    callbacks.onError('Chưa cấu hình VITE_ASSISTANT_API_URL trong file .env.');
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
    callbacks.onError(
      'Không thể kết nối tới máy chủ trợ lý AI. Vui lòng kiểm tra kết nối mạng hoặc cấu hình CORS.'
    );
    return;
  }

  if (!response.ok) {
    let errorMessage = `Lỗi máy chủ (${response.status}).`;
    try {
      const errBody = (await response.json()) as ApiResponse<null>;
      if (response.status === 401) {
        errorMessage =
          'Thiếu hoặc sai API Key (X-API-Key). Hãy kiểm tra VITE_ASSISTANT_API_KEY trong file .env.';
      } else if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        errorMessage = retryAfter
          ? `Bạn đang gửi quá nhiều câu hỏi. Vui lòng thử lại sau ${retryAfter} giây.`
          : 'Bạn đang gửi quá nhiều câu hỏi. Vui lòng thử lại sau ít phút.';
      } else if (errBody?.message) {
        errorMessage = errBody.message;
      }
    } catch {
      if (response.status === 401) {
        errorMessage =
          'Thiếu hoặc sai API Key (X-API-Key). Hãy kiểm tra VITE_ASSISTANT_API_KEY trong file .env.';
      }
    }
    callbacks.onError(errorMessage);
    return;
  }

  if (!response.body) {
    callbacks.onError('Trình duyệt không hỗ trợ đọc dữ liệu stream từ phản hồi.');
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
      try {
        const parsed = JSON.parse(rawData) as ApiResponse<null>;
        callbacks.onError(parsed.message || 'Đã xảy ra lỗi khi tạo câu trả lời.');
      } catch {
        callbacks.onError(rawData || 'Đã xảy ra lỗi khi tạo câu trả lời.');
      }
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
    callbacks.onError('Kết nối stream bị gián đoạn. Vui lòng thử lại.');
  } finally {
    reader.releaseLock();
  }
}
