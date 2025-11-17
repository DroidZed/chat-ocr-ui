import { cn } from '../lib/utils'
import {
  ChatHeader,
  MessagesArea,
  ChatInputSection,
  OcrKeysDialogContainer,
} from '../components/custom'

export default function HomeScreen() {
  return (
    <div className="flex flex-col flex-1 w-full p-5">
      <div
        className={cn(
          'w-full flex-1 bg-white rounded-lg shadow-xl border flex flex-col'
        )}
      >
        <ChatHeader />
        <MessagesArea />
        <ChatInputSection />
      </div>
      <OcrKeysDialogContainer />
    </div>
  );
}
