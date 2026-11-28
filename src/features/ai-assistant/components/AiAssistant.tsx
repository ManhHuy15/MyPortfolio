import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import assistantAvatar from '@/assets/images/avatar-transparent.png';
import { usePortfolioChat } from '@/hooks/usePortfolioChat';
import { QUICK_QUESTIONS, WELCOME_MESSAGE } from '../constants/prompts';
import { MessageContent } from './MessageContent';
import '../styles/AiAssistant.scss';

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreetingBubble, setShowGreetingBubble] = useState(true);
  const [input, setInput] = useState('');

  const { messages, isStreaming, sendMessage, stopStreaming, resetChat } =
    usePortfolioChat(WELCOME_MESSAGE);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setShowGreetingBubble(false);
  };

  const handleReset = () => {
    resetChat();
    setInput('');
  };

  const handleSend = async (rawText?: string) => {
    const text = (rawText ?? input).trim();
    if (!text || isStreaming) {
      return;
    }

    if (rawText === undefined) {
      setInput('');
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }

    await sendMessage(text);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 108)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const showQuickQuestions = messages.length <= 1 && !isStreaming;

  return (
    <div className="ai-assistant-root">
      {isOpen && (
        <section
          className="ai-chat-window"
          role="dialog"
          aria-label="Trợ lý AI của Nguyễn Mạnh Huy"
        >
          <header className="ai-chat-header">
            <div className="ai-chat-header-info">
              <div className="ai-header-avatar">
                <img src={assistantAvatar} alt="AI Assistant" />
                <span className="status-dot" />
              </div>
              <div className="ai-header-text">
                <h3>Huy&apos;s AI Assistant</h3>
                <span className="ai-header-status">
                  {isStreaming ? 'Đang trả lời...' : 'Hỏi nhanh thông tin về Huy'}
                </span>
              </div>
            </div>
            <div className="ai-chat-header-actions">
              <button
                type="button"
                className="header-icon-btn"
                onClick={handleReset}
                title="Cuộc trò chuyện mới"
                aria-label="Cuộc trò chuyện mới"
              >
                <RefreshRoundedIcon fontSize="small" />
              </button>
              <button
                type="button"
                className="header-icon-btn"
                onClick={handleToggle}
                title="Đóng"
                aria-label="Đóng khung chat"
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>
          </header>

          <div className="ai-chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`ai-message-row ${msg.role} ${msg.isError ? 'error' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <div className="ai-msg-avatar">
                    <img src={assistantAvatar} alt="AI" />
                  </div>
                )}

                <div className="ai-msg-bubble">
                  {msg.isStreaming && !msg.content ? (
                    <div className="typing-indicator" aria-label="Đang suy nghĩ">
                      <span />
                      <span />
                      <span />
                    </div>
                  ) : (
                    <>
                      <MessageContent content={msg.content} />
                      {msg.isStreaming && <span className="stream-cursor" />}
                    </>
                  )}

                  {msg.sources && msg.sources.length > 0 && !msg.isStreaming && (
                    <div className="ai-msg-sources">
                      <span className="sources-label">Nguồn tham khảo:</span>
                      <div className="sources-chips">
                        {msg.sources.map((src, index) => (
                          <span key={index} className="source-chip">
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {showQuickQuestions && (
              <div className="ai-quick-questions">
                <div className="quick-title">
                  <AutoAwesomeRoundedIcon fontSize="inherit" />
                  <span>Gợi ý câu hỏi nhanh</span>
                </div>
                <div className="quick-chips">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      className="quick-chip-btn"
                      onClick={() => void handleSend(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            className="ai-chat-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              void handleSend();
            }}
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Hỏi bất cứ điều gì về Huy..."
              disabled={isStreaming}
              aria-label="Nhập câu hỏi"
            />
            {isStreaming ? (
              <button
                type="button"
                className="send-btn stop-btn"
                onClick={stopStreaming}
                title="Dừng trả lời"
                aria-label="Dừng trả lời"
              >
                <StopRoundedIcon fontSize="small" />
              </button>
            ) : (
              <button
                type="submit"
                className="send-btn"
                disabled={!input.trim()}
                title="Gửi câu hỏi"
                aria-label="Gửi câu hỏi"
              >
                <SendRoundedIcon fontSize="small" />
              </button>
            )}
          </form>
        </section>
      )}

      {!isOpen && showGreetingBubble && (
        <div
          className="ai-greeting-bubble"
          onClick={handleToggle}
          role="button"
          tabIndex={0}
        >
          <span>Hỏi nhanh về Huy?</span>
          <button
            type="button"
            className="greeting-close"
            onClick={(e) => {
              e.stopPropagation();
              setShowGreetingBubble(false);
            }}
            aria-label="Ẩn lời chào"
          >
            ×
          </button>
        </div>
      )}

      <button
        type="button"
        className={`ai-launcher-btn ${isOpen ? 'open' : ''}`}
        onClick={handleToggle}
        aria-label={isOpen ? 'Đóng trợ lý AI' : 'Mở trợ lý AI'}
        title="Trợ lý AI của Huy"
      >
        <img
          src={assistantAvatar}
          alt="Trợ lý AI của Huy"
          className="launcher-avatar"
        />
        <span className="launcher-status-dot" />
      </button>
    </div>
  );
}

export default AiAssistant;
