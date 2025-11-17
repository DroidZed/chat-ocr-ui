import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { isKeysDialogOpenAtom, uploadedImageAtom, messageTextAtom } from '../../core/store';
import { type OcrKey } from '../../core/schemas';
import OcrKeysDialog from './OcrKeysDialog';

export default function OcrKeysDialogContainer() {
  const [isOpen, setIsOpen] = useAtom(isKeysDialogOpenAtom);
  const uploadedImage = useAtomValue(uploadedImageAtom);
  const setUploadedImage = useSetAtom(uploadedImageAtom);
  const [messageText, setMessageText] = useAtom(messageTextAtom);

  const handleSubmit = (keys: OcrKey[]) => {
    if (uploadedImage) {
      setUploadedImage({
        ...uploadedImage,
        keys,
      });

      // Add keys comma-separated to the message field
      const keysText = keys.map(k => k.key).join(', ');
      const currentMessage = messageText || '';
      const newMessage = currentMessage ? `${currentMessage}, ${keysText}` : keysText;
      setMessageText(newMessage);
    }
  };

  return (
    <OcrKeysDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      onSubmit={handleSubmit}
      fileName={uploadedImage?.file.name || ''}
      initialKeys={uploadedImage?.keys || []}
    />
  );
}
