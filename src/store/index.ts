import { atom } from 'jotai'
import { type UploadedFile } from '../schemas'

export const uploadedImageAtom = atom<UploadedFile | null>(null)
