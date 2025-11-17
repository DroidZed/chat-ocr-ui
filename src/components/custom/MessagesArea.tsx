import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import { messagesAtom, hasMessagesAtom } from '../../core/store';
import MessageBubble from './MessageBubble';

export default function MessagesArea() {
  const messages = useAtomValue(messagesAtom);
  const hasMessages = useAtomValue(hasMessagesAtom);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {!hasMessages ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-xl font-medium text-gray-400">
            Start a conversation
          </div>
        </div>
      ) : (
        messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
