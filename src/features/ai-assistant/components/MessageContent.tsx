import React from 'react';

function renderInlineFormatting(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s)]+)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={index} href={part} target="_blank" rel="noreferrer">
          {part}
        </a>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

interface MessageContentProps {
  content: string;
}

export function MessageContent({ content }: MessageContentProps) {
  const lines = content.split('\n');
  return (
    <div className="message-text">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="message-spacer" />;
        }
        if (/^[-*•]\s+/.test(trimmed)) {
          return (
            <div key={idx} className="message-list-item">
              <span className="bullet">•</span>
              <span>
                {renderInlineFormatting(trimmed.replace(/^[-*•]\s+/, ''))}
              </span>
            </div>
          );
        }
        return (
          <p key={idx} className="message-paragraph">
            {renderInlineFormatting(line)}
          </p>
        );
      })}
    </div>
  );
}
