import { getDefaultStore } from 'jotai';
import { messagesAtom } from '../store';

/**
 * Utility functions for working with messages outside of React components.
 * These can be used in API handlers, services, or any non-component code.
 */

const store = getDefaultStore();

interface AddMessageParams {
  text: string;
  sender: 'user' | 'assistant' | 'system';
  attachment?: {
    fileName: string;
    fileType: string;
    previewUrl?: string;
    keys?: Array<{
      id: string;
      key: string;
    }>;
  };
}

/**
 * Adds a message to the global messages state from outside a React component
 */
export const addMessage = (params: AddMessageParams) => {
  const currentMessages = store.get(messagesAtom);
  store.set(messagesAtom, [...currentMessages, params]);
};

/**
 * Gets the current messages array
 */
export const getMessages = () => {
  return store.get(messagesAtom);
};

/**
 * Clears all messages
 */
export const clearMessages = () => {
  store.set(messagesAtom, []);
};

/**
 * Removes a message by index
 */
export const removeMessage = (index: number) => {
  const currentMessages = store.get(messagesAtom);
  store.set(
    messagesAtom,
    currentMessages.filter((_, i) => i !== index)
  );
};

/**
 * Updates a message by index
 */
export const updateMessage = (
  index: number,
  updates: Partial<AddMessageParams>
) => {
  const currentMessages = store.get(messagesAtom);
  store.set(
    messagesAtom,
    currentMessages.map((msg, i) =>
      i === index ? { ...msg, ...updates } : msg
    )
  );
};

/**
 * Adds a system message (helper function)
 */
export const addSystemMessage = (text: string) => {
  addMessage({ text, sender: 'system' });
};

/**
 * Adds an assistant message (helper function)
 */
export const addAssistantMessage = (text: string) => {
  addMessage({ text, sender: 'assistant' });
};

/**
 * Adds a user message (helper function)
 */
export const addUserMessage = (text: string) => {
  addMessage({ text, sender: 'user' });
};

/**
 * Example usage in an API handler:
 *
 * import { addAssistantMessage, addSystemMessage } from '@/utils/messageUtils'
 *
 * async function handleApiResponse(response) {
 *   try {
 *     const data = await response.json()
 *     addAssistantMessage(`Received response: ${JSON.stringify(data)}`)
 *   } catch (error) {
 *     addSystemMessage(`Error: ${error.message}`)
 *   }
 * }
 */

export default {
  addMessage,
  getMessages,
  clearMessages,
  removeMessage,
  updateMessage,
  addSystemMessage,
  addAssistantMessage,
  addUserMessage,
};
