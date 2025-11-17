import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import {
  uploadedImageAtom,
  uploadedImageHasKeysAtom,
  clearUploadedImageAtom,
  isSubmittingMessageAtom,
} from '../core/store';
import { useAddMessage } from './useMessages';
import { useOcrUpload } from './useOcrUpload';
import type { MessageFormData } from '../core/schemas';

export const useMessageSubmit = () => {
  const addMessage = useAddMessage();
  const uploadedImage = useAtomValue(uploadedImageAtom);
  const uploadedImageHasKeys = useAtomValue(uploadedImageHasKeysAtom);
  const clearUploadedImage = useSetAtom(clearUploadedImageAtom);
  const setIsSubmitting = useSetAtom(isSubmittingMessageAtom);

  const { mutateAsync: uploadOcr } = useOcrUpload();

  const submitMessage = useCallback(
    async (data: MessageFormData) => {
      if (uploadedImage && !uploadedImageHasKeys) {
        alert('Please add OCR keys for the attachment');
        return false;
      }

      setIsSubmitting(true);

      try {
        if (uploadedImage) {
          // Add user message with attachment
          addMessage({
            text: data.message,
            sender: 'user',
            attachment: {
              fileName: uploadedImage.file.name,
              fileType: uploadedImage.file.type,
              previewUrl: uploadedImage.previewUrl,
              keys: uploadedImage.keys,
            },
          });

          // Prepare OCR payload
          const keysToExtract = uploadedImage.keys?.map((k) => k.key) || [];

          // Call OCR API
          const response = await uploadOcr({
            image: uploadedImage.file,
            keys_to_extract: keysToExtract,
          });

          // Add assistant response with OCR data
          addMessage({
            text: 'Here are the extracted fields from your document:',
            sender: 'assistant',
            ocrResponse: response[0].ai_response,
          });

          clearUploadedImage();
        } else {
          // Regular message without attachment
          addMessage({ text: data.message, sender: 'user' });
        }

        return true;
      } catch (error) {
        console.error('Error submitting message:', error);

        // Add error message
        addMessage({
          text: 'Sorry, there was an error processing your request. Please try again.',
          sender: 'assistant',
        });

        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      uploadedImage,
      uploadedImageHasKeys,
      addMessage,
      clearUploadedImage,
      uploadOcr,
      setIsSubmitting,
    ]
  );

  const canSubmit = useCallback(
    (messageValue: string | undefined) => {
      return !!(
        messageValue?.trim() &&
        (!uploadedImage || uploadedImageHasKeys)
      );
    },
    [uploadedImage, uploadedImageHasKeys]
  );

  return {
    submitMessage,
    canSubmit,
    hasAttachment: !!uploadedImage,
    attachmentHasKeys: uploadedImageHasKeys,
  };
};
