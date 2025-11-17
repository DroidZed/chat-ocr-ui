import { Paperclip } from 'lucide-react';
import { useFileUpload } from '../../hooks/useFileUpload';

export default function FileUploadButton() {
  const { fileInputRef, triggerFileUpload, handleFileChange } = useFileUpload();

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="image/*,.pdf"
      />
      <button
        onClick={triggerFileUpload}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
        aria-label="Upload file"
        type="button"
      >
        <Paperclip className="w-5 h-5 text-gray-600" />
      </button>
    </>
  );
}
