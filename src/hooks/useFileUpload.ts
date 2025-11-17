import { useSetAtom } from 'jotai';
import { useRef, useCallback } from 'react';
import { uploadedImageAtom, isKeysDialogOpenAtom } from '../core/store';
import {
  isValidFileType,
  isValidFileSize,
  isImageFile,
  MAX_FILE_SIZE,
} from '../core/schemas';

export const useFileUpload = () => {
  const setUploadedImage = useSetAtom(uploadedImageAtom);
  const setIsKeysDialogOpen = useSetAtom(isKeysDialogOpenAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      if (!isValidFileType(file)) {
        alert('Please upload only images (JPEG, PNG, GIF, WebP) or PDF files.');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      if (!isValidFileSize(file)) {
        alert(
          `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB.`
        );
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      if (isImageFile(file)) {
        const previewUrl = URL.createObjectURL(file);
        setUploadedImage({ file, previewUrl });
      } else {
        setUploadedImage({ file, previewUrl: '' });
      }

      setIsKeysDialogOpen(true);
    },
    [setUploadedImage, setIsKeysDialogOpen]
  );

  return {
    fileInputRef,
    triggerFileUpload,
    handleFileChange,
  };
};
