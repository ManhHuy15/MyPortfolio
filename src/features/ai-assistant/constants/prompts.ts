import type { ChatMessage } from '@/types/chat';

export const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Xin chào! Mình là trợ lý AI của **Nguyễn Mạnh Huy**. Bạn có thể hỏi nhanh về kinh nghiệm, dự án, kỹ năng công nghệ hoặc cách liên hệ với Huy nhé!',
};

export const QUICK_QUESTIONS: readonly string[] = [
  'Giới thiệu về Huy?',
  'Các dự án nổi bật của Huy?',
  'Huy mạnh về công nghệ nào?',
  'Cách liên hệ với Huy?',
];
