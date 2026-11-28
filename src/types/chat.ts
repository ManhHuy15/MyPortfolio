export interface ChatRequestDto {
  sessionId: string;
  message: string;
}

export interface ChatResponseDto {
  sessionId: string;
  reply: string;
  sources: string[];
  isCached: boolean;
}

export interface ApiErrorItem {
  code: string;
  message: string;
  field: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors: ApiErrorItem[] | null;
  traceId: string | null;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  isStreaming?: boolean;
  isError?: boolean;
}

export interface StreamChatCallbacks {
  onToken: (token: string) => void;
  onDone: (response: ChatResponseDto) => void;
  onError: (message: string) => void;
}
