interface ChatHeaderProps {
  title?: string;
}

export default function ChatHeader({
  title = 'Chat Assistant',
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-black text-white rounded-t-lg shrink-0">
      <h3 className="font-semibold">{title}</h3>
    </div>
  );
}
