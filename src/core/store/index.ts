import { atom } from 'jotai';
import { type UploadedFile, type MessageListSchemaT } from '../schemas';

// Base atoms
export const uploadedImageAtom = atom<UploadedFile | null>(null);
export const messagesAtom = atom<MessageListSchemaT>([]);
export const isKeysDialogOpenAtom = atom<boolean>(false);
export const messageTextAtom = atom<string>('');
export const isSubmittingMessageAtom = atom<boolean>(false);

// Derived atoms
export const hasUploadedImageAtom = atom(
  (get) => get(uploadedImageAtom) !== null
);

export const uploadedImageHasKeysAtom = atom((get) => {
  const image = get(uploadedImageAtom);
  return image?.keys && image.keys.length > 0;
});

export const canSendMessageAtom = atom((get) => {
  const image = get(uploadedImageAtom);
  if (!image) return true;
  return image.keys && image.keys.length > 0;
});

export const messagesCountAtom = atom((get) => get(messagesAtom).length);

export const hasMessagesAtom = atom((get) => get(messagesAtom).length > 0);

// Write-only atoms for actions
export const clearUploadedImageAtom = atom(null, (get, set) => {
  const image = get(uploadedImageAtom);
  if (image?.previewUrl) {
    URL.revokeObjectURL(image.previewUrl);
  }
  set(uploadedImageAtom, null);
});
