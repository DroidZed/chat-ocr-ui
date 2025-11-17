import { z } from 'zod'

// Accepted file types
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
export const ACCEPTED_PDF_TYPE = 'application/pdf'
export const ACCEPTED_FILE_TYPES = [...ACCEPTED_IMAGE_TYPES, ACCEPTED_PDF_TYPE]

// Maximum file size (10MB)
export const MAX_FILE_SIZE = 10 * 1024 * 1024

// File validation schema
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: 'File size must be less than 10MB',
    })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: 'Only images (JPEG, PNG, GIF, WebP) and PDF files are allowed',
    }),
})

// Utility function to validate file type
export const isValidFileType = (file: File): boolean => {
  return ACCEPTED_FILE_TYPES.includes(file.type)
}

// Utility function to validate file size
export const isValidFileSize = (file: File): boolean => {
  return file.size <= MAX_FILE_SIZE
}

// Utility function to check if file is an image
export const isImageFile = (file: File): boolean => {
  return ACCEPTED_IMAGE_TYPES.includes(file.type)
}

// Utility function to check if file is a PDF
export const isPdfFile = (file: File): boolean => {
  return file.type === ACCEPTED_PDF_TYPE
}

// OCR Keys schema
export const ocrKeySchema = z.object({
  id: z.string(),
  key: z.string().min(1, 'Key cannot be empty'),
})

export const ocrKeysListSchema = z.array(ocrKeySchema)

export type OcrKey = z.infer<typeof ocrKeySchema>
export type OcrKeysList = z.infer<typeof ocrKeysListSchema>

// Type for uploaded file state
export interface UploadedFile {
  file: File
  previewUrl: string
  keys?: OcrKey[]
}

export type FileUploadData = z.infer<typeof fileUploadSchema>
