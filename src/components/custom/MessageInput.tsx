import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAtom, useAtomValue } from 'jotai';
import { cn } from '../../lib/utils';
import { type MessageFormData, messageSchema } from '../../core/schemas';
import { useMessageSubmit } from '../../hooks/useMessageSubmit';
import { messageTextAtom, isSubmittingMessageAtom } from '../../core/store';
import { useEffect } from 'react';

export default function MessageInput() {
  const { submitMessage, canSubmit, hasAttachment } = useMessageSubmit();
  const [messageText, setMessageText] = useAtom(messageTextAtom);
  const isSubmitting = useAtomValue(isSubmittingMessageAtom);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    mode: 'onChange',
    defaultValues: {
      message: messageText,
    },
  });

  const messageValue = watch('message');

  // Sync atom with form when atom changes (from OCR keys submission)
  useEffect(() => {
    if (messageText && messageText !== messageValue) {
      setValue('message', messageText, { shouldValidate: true });
    }
  }, [messageText, messageValue, setValue]);

  // Sync form with atom when form changes
  useEffect(() => {
    if (messageValue !== messageText) {
      setMessageText(messageValue);
    }
  }, [messageValue, messageText, setMessageText]);

  const onSubmit = async (data: MessageFormData) => {
    const success = await submitMessage(data);
    if (success) {
      reset();
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const isDisabled = !isValid || !canSubmit(messageValue) || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 items-center gap-2">
      <div className="flex-1">
        <input
          type="text"
          {...register('message')}
          onKeyDown={handleKeyPress}
          disabled={isSubmitting}
          placeholder={
            isSubmitting
              ? 'Processing...'
              : hasAttachment
                ? 'Message required to send attachment...'
                : 'Type your message...'
          }
          className={cn(
            'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
            errors.message
              ? 'border-red-500'
              : hasAttachment
                ? 'border-amber-500'
                : 'border-gray-300'
          )}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className={cn(
          'p-2 rounded-lg transition-colors shrink-0',
          !isDisabled
            ? 'bg-black text-white hover:bg-black/90'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        )}
        aria-label="Send message"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </button>
    </form>
  );
}
