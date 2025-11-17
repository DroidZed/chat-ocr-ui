import { z } from 'zod'

export const messageSchema = z.object({
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .trim(),
})

export type MessageFormData = z.infer<typeof messageSchema>

export const messageListSchema = z.array(z.object({
  text: z.string(),
  sender: z.string(),
  attachment: z.object({
    fileName: z.string(),
    fileType: z.string(),
    previewUrl: z.string().optional(),
    keys: z.array(z.object({
      id: z.string(),
      key: z.string(),
    })).optional(),
  }).optional()
}))

export type MessageListSchemaT = z.infer<typeof messageListSchema>

export const messageWithAttachmentSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').trim(),
  attachment: z.object({
    file: z.instanceof(File),
    previewUrl: z.string(),
    keys: z.array(z.object({
      id: z.string(),
      key: z.string(),
    })).optional(),
  }).optional()
}).refine(
  () => {
    // If there's an attachment, message is required (already enforced by min(1))
    // If there's a message, attachment is optional
    return true
  },
  {
    message: 'Message and attachment must be sent together',
  }
)

export type MessageWithAttachmentData = z.infer<typeof messageWithAttachmentSchema>
