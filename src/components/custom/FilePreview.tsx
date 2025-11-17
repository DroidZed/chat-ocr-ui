import { useAtomValue, useSetAtom } from 'jotai';
import { X } from 'lucide-react';
import {
  uploadedImageAtom,
  isKeysDialogOpenAtom,
  clearUploadedImageAtom,
} from '../../core/store';
import { isImageFile } from '../../core/schemas';

export default function FilePreview() {
  const uploadedImage = useAtomValue(uploadedImageAtom);
  const setIsKeysDialogOpen = useSetAtom(isKeysDialogOpenAtom);
  const clearUploadedImage = useSetAtom(clearUploadedImageAtom);

  if (!uploadedImage) return null;

  const handleRemoveImage = () => {
    clearUploadedImage();
  };

  const handleEditKeys = () => {
    setIsKeysDialogOpen(true);
  };

  return (
    <div className="mb-3 relative inline-block">
      <div className="relative rounded-lg overflow-hidden border-2 border-gray-300">
        {isImageFile(uploadedImage.file) ? (
          <img
            src={uploadedImage.previewUrl}
            alt="Upload preview"
            className="max-h-32 max-w-xs object-contain"
          />
        ) : (
          <div className="flex items-center gap-2 p-4 bg-gray-100">
            <svg
              className="w-8 h-8 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700">
              PDF Document
            </span>
          </div>
        )}
        <button
          onClick={handleRemoveImage}
          className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-black rounded-full text-white transition-colors"
          aria-label="Remove file"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="mt-1">
        <p className="text-xs text-gray-600">{uploadedImage.file.name}</p>
        {uploadedImage.keys && uploadedImage.keys.length > 0 ? (
          <div className="mt-1">
            <p className="text-xs text-green-600 font-medium">
              ✓ {uploadedImage.keys.length} key
              {uploadedImage.keys.length > 1 ? 's' : ''} added
            </p>
            <button
              type="button"
              onClick={handleEditKeys}
              className="text-xs text-blue-600 hover:underline"
            >
              Edit keys
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleEditKeys}
            className="text-xs text-amber-600 font-medium mt-0.5 hover:underline"
          >
            ⚠️ Add OCR keys (required)
          </button>
        )}
        <p className="text-xs text-gray-500 mt-0.5">
          Attachment must be sent with a message
        </p>
      </div>
    </div>
  );
}
