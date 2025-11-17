import FilePreview from './FilePreview';
import FileUploadButton from './FileUploadButton';
import MessageInput from './MessageInput';

export default function ChatInputSection() {
  return (
    <div className="border-t  bg-white p-4 rounded-b-lg shrink-0">
      <FilePreview />
      <div className="flex flex-1 items-center gap-2">
        <FileUploadButton />
        <MessageInput />
      </div>
    </div>
  );
}
