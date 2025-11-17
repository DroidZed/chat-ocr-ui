import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import { Send, Paperclip, X } from 'lucide-react'
import { useEffect, useRef, useState, } from 'react'
import { useForm } from 'react-hook-form'
import { cn } from '../lib/utils'
import { type MessageFormData, type MessageListSchemaT, messageSchema, isValidFileType, isValidFileSize, isImageFile, MAX_FILE_SIZE, type OcrKey } from '../schemas'
import { uploadedImageAtom } from '../store'
import OcrKeysDialog from '../components/custom/OcrKeysDialog'

export default function HomeScreen() {
  const [messages, setMessages] = useState<MessageListSchemaT>([])
  const [uploadedImage, setUploadedImage] = useAtom(uploadedImageAtom)
  const [isKeysDialogOpen, setIsKeysDialogOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const objectUrlsRef = useRef<Set<string>>(new Set())

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    mode: 'onChange',
    defaultValues: {
      message: '',
    },
  })

  const messageValue = watch('message')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  const onSubmit = (data: MessageFormData) => {
    // Validation: if there's an attachment, keys must be set
    if (uploadedImage && (!uploadedImage.keys || uploadedImage.keys.length === 0)) {
      alert('Please add OCR keys for the attachment')
      return
    }

    // If there's an attachment, both must be sent together
    if (uploadedImage) {
      setMessages([
        ...messages,
        {
          text: data.message,
          sender: 'user',
          attachment: {
            fileName: uploadedImage.file.name,
            fileType: uploadedImage.file.type,
            previewUrl: uploadedImage.previewUrl,
            keys: uploadedImage.keys,
          },
        },
      ])
      // Clear the attachment after sending (don't revoke URL as it's used in messages)
      setUploadedImage(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } else {
      setMessages([...messages, { text: data.message, sender: 'user' }])
    }
    reset()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    // Validate file type
    if (!isValidFileType(file)) {
      alert('Please upload only images (JPEG, PNG, GIF, WebP) or PDF files.')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      return
    }

    // Validate file size
    if (!isValidFileSize(file)) {
      alert(`File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB.`)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      return
    }

    // Create preview only for images
    if (isImageFile(file)) {
      const previewUrl = URL.createObjectURL(file)
      objectUrlsRef.current.add(previewUrl)
      setUploadedImage({ file, previewUrl })
    } else {
      // For PDFs, we don't create a preview URL
      setUploadedImage({ file, previewUrl: '' })
    }

    // Open the keys dialog after file is selected
    setIsKeysDialogOpen(true)
  }

  const handleOcrKeysSubmit = (keys: OcrKey[]) => {
    if (uploadedImage) {
      setUploadedImage({
        ...uploadedImage,
        keys,
      })

      // Add keys comma-separated to the message field
      const keysText = keys.map(k => k.key).join(', ')
      const currentMessage = messageValue || ''
      const newMessage = currentMessage ? `${currentMessage}, ${keysText}` : keysText
      setValue('message', newMessage, { shouldValidate: true })
    }
  }

  const handleRemoveImage = () => {
    if (uploadedImage?.previewUrl) {
      URL.revokeObjectURL(uploadedImage.previewUrl)
      objectUrlsRef.current.delete(uploadedImage.previewUrl)
    }
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  useEffect(() => {
    return () => {
      // Clean up all object URLs when component unmounts
      objectUrlsRef.current.forEach(url => {
        URL.revokeObjectURL(url)
      })
      objectUrlsRef.current.clear()
    }
  }, [])

  return (
    <div className="flex flex-col flex-1 w-full p-5">
      <div
        className={cn(
          "w-full flex-1 bg-white rounded-lg shadow-xl border flex flex-col"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-black text-white rounded-t-lg shrink-0">
          <h3 className="font-semibold">Chat Assistant</h3>
        </div>

        {/* Messages Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-xl font-medium text-gray-400">
                Start a conversation
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-2",
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                )}
              >
                {msg.attachment && (
                  <div className={cn(
                    "max-w-[70%]",
                  )}>
                    <div className={cn(
                      "rounded-lg overflow-hidden border",
                      msg.sender === 'user' ? 'border-black/20' : 'border-gray-200'
                    )}>
                      {msg.attachment.fileType.startsWith('image/') && msg.attachment.previewUrl ? (
                        <img
                          src={msg.attachment.previewUrl}
                          alt={msg.attachment.fileName}
                          className="max-w-full h-auto max-h-64 object-contain"
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-3 bg-gray-100">
                          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs font-medium text-gray-700">{msg.attachment.fileName}</span>
                        </div>
                      )}
                    </div>
                    {msg.attachment.keys && msg.attachment.keys.length > 0 && (
                      <div className="mt-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                        <p className="text-xs font-semibold text-gray-700 mb-1">OCR Keys:</p>
                        <div className="flex flex-wrap gap-1">
                          {msg.attachment.keys.map((keyItem) => (
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
                    "max-w-[70%] rounded-lg px-4 py-2",
                    msg.sender === 'user'
                      ? 'bg-black text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="border-t bg-white p-4 rounded-b-lg shrink-0">
          {/* File Preview */}
          {uploadedImage && (
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
                    <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">PDF Document</span>
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
                      ✓ {uploadedImage.keys.length} key{uploadedImage.keys.length > 1 ? 's' : ''} added
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsKeysDialogOpen(true)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Edit keys
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsKeysDialogOpen(true)}
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
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-2">
              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,.pdf"
              />

              {/* File Upload Button */}
              <button
                onClick={handleFileUpload}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
                aria-label="Upload file"
                type="button"
              >
                <Paperclip className="w-5 h-5 text-gray-600" />
              </button>

              {/* Text Input */}
              <div className="flex-1">
                <input
                  type="text"
                  {...register('message')}
                  onKeyDown={handleKeyPress}
                  placeholder={uploadedImage ? "Message required to send attachment..." : "Type your message..."}
                  className={cn(
                    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                    errors.message ? "border-red-500" : uploadedImage ? "border-amber-500" : "border-gray-300"
                  )}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={
                  !isValid ||
                  !messageValue?.trim() ||
                  (!!uploadedImage && (!uploadedImage.keys || uploadedImage.keys.length === 0))
                }
                className={cn(
                  "p-2 rounded-lg transition-colors shrink-0",
                  isValid && messageValue?.trim() && (!uploadedImage || (uploadedImage.keys && uploadedImage.keys.length > 0))
                    ? "bg-black text-white hover:bg-black/90"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* OCR Keys Dialog */}
      <OcrKeysDialog
        open={isKeysDialogOpen}
        onOpenChange={setIsKeysDialogOpen}
        onSubmit={handleOcrKeysSubmit}
        fileName={uploadedImage?.file.name || ''}
        initialKeys={uploadedImage?.keys || []}
      />
    </div>
  )
}
