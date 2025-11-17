import { useAtom, useSetAtom } from 'jotai';
import { messagesAtom } from '../core/store';

type MessageSender = 'user' | 'assistant' | 'system';

interface AddMessageParams {
  text: string;
  sender: MessageSender;
  attachment?: {
    fileName: string;
    fileType: string;
    previewUrl?: string;
    keys?: Array<{
      id: string;
      key: string;
    }>;
  };
  ocrResponse?: Record<string, any>;
}

export const useMessages = () => {
  const [messages, setMessages] = useAtom(messagesAtom);

  const addMessage = (params: AddMessageParams) => {
    setMessages((prev) => [...prev, params]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const removeMessage = (index: number) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMessage = (index: number, updates: Partial<AddMessageParams>) => {
    setMessages((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, ...updates } : msg))
    );
  };

  return {
    messages,
    addMessage,
    clearMessages,
    removeMessage,
    updateMessage,
  };
};

// Hook that only provides the setter function (for components that don't need to read messages)
export const useAddMessage = () => {
  const setMessages = useSetAtom(messagesAtom);

  const addMessage = (params: AddMessageParams) => {
    setMessages((prev) => [...prev, params]);
  };

  return addMessage;
};
