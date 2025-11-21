import { cn } from '../../lib/utils';
import type { MessageListSchemaT } from '../../core/schemas';

interface MessageBubbleProps {
  message: MessageListSchemaT[number];
}

const OcrResponseTable = ({ data }: { data: Record<string, unknown> }) => {
  const entries = Object.entries(data);

  if (entries.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">
        No data extracted
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-linear-to-r from-blue-50 to-indigo-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Field
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries.map(([key, value], index) => (
            <tr
              key={key}
              className={cn(
                'hover:bg-gray-50 transition-colors',
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              )}
            >
              <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                {key}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {typeof value === 'object' && value !== null
                  ? JSON.stringify(value, null, 2)
                  : String(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        isUser ? 'items-end' : 'items-start'
      )}
    >
      {message.attachment && (
        <div className="max-w-[80%]">
          <div
            className={cn(
              'rounded-lg overflow-hidden border',
              isUser ? 'border-black/20' : 'border-gray-200'
            )}
          >
            {message.attachment.fileType.startsWith('image/') &&
              message.attachment.previewUrl ? (
              <img
                src={message.attachment.previewUrl}
                alt={message.attachment.fileName}
                className="w-[500px] h-[500px] object-contain"
              />
            ) : (
              <div className="flex items-center gap-2 p-3 bg-gray-100">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs font-medium text-gray-700">
                  {message.attachment.fileName}
                </span>
              </div>
            )}
          </div>
          {message.attachment.keys && message.attachment.keys.length > 0 && (
            <div className="mt-2 p-2 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-1">
                OCR Keys:
              </p>
              <div className="flex flex-wrap gap-1">
                {message.attachment.keys.map((keyItem) => (
                  <span
                    key={keyItem.id}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {keyItem.key}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div
        className={cn(
          'max-w-[70%] rounded-lg px-4 py-2',
          isUser
            ? 'bg-black text-white'
            : 'bg-white border border-gray-200 text-gray-800'
        )}
      >
        {message.text}
      </div>
      {message.ocrResponse && (
        <div className="max-w-[80%] w-full">
          <OcrResponseTable data={message.ocrResponse} />
        </div>
      )}
    </div>
  );
}
