import { useCallback, useEffect, useRef, useState } from 'react';
import { streamPortfolioChat } from '@/services/chat.service';
import type { ChatMessage } from '@/types/chat';
import { getOrCreateSessionId, resetSessionId } from '@/utils/session';

export function usePortfolioChat(initialMessage: ChatMessage) {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => getOrCreateSessionId());
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const stopStreaming = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsStreaming(false);
    setMessages((prev) =>
      prev.map((msg) =>
        msg.isStreaming
          ? {
              ...msg,
              content: msg.content || 'Đã dừng tạo câu trả lời.',
              isStreaming: false,
            }
          : msg
      )
    );
  }, []);

  const resetChat = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsStreaming(false);
    setSessionId(resetSessionId());
    setMessages([initialMessage]);
  }, [initialMessage]);

  const sendMessage = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (!text || isStreaming) {
        return;
      }

      const userMsgId = `user-${Date.now()}`;
      const assistantMsgId = `assistant-${Date.now() + 1}`;

      setMessages((prev) => [
        ...prev,
        { id: userMsgId, role: 'user', content: text },
        { id: assistantMsgId, role: 'assistant', content: '', isStreaming: true },
      ]);

      setIsStreaming(true);
      const controller = new AbortController();
      abortControllerRef.current = controller;

      await streamPortfolioChat(
        { sessionId, message: text },
        {
          onToken: (token) => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsgId
                  ? { ...msg, content: msg.content + token }
                  : msg
              )
            );
          },
          onDone: (data) => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsgId
                  ? {
                      ...msg,
                      content:
                        data.reply ||
                        msg.content ||
                        'Mình chưa tìm thấy thông tin phù hợp.',
                      sources: data.sources?.length ? data.sources : undefined,
                      isStreaming: false,
                    }
                  : msg
              )
            );
            setIsStreaming(false);
            abortControllerRef.current = null;
          },
          onError: (errorMessage) => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsgId
                  ? {
                      ...msg,
                      content: errorMessage,
                      isStreaming: false,
                      isError: true,
                    }
                  : msg
              )
            );
            setIsStreaming(false);
            abortControllerRef.current = null;
          },
        },
        controller.signal
      );
    },
    [isStreaming, sessionId]
  );

  return {
    messages,
    isStreaming,
    sendMessage,
    stopStreaming,
    resetChat,
  };
}
