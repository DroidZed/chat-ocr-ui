import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'
import type { OcrKey } from '../../schemas'

const ocrKeysFormSchema = z.object({
  keys: z.array(
    z.object({
      id: z.string(),
      key: z.string().min(1, 'Key cannot be empty'),
    })
  ).min(1, 'At least one key is required'),
})

type OcrKeysFormData = z.infer<typeof ocrKeysFormSchema>

interface OcrKeysDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (keys: OcrKey[]) => void
  fileName: string
  initialKeys?: OcrKey[]
}

export default function OcrKeysDialog({
  open,
  onOpenChange,
  onSubmit,
  fileName,
  initialKeys = [],
}: OcrKeysDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<OcrKeysFormData>({
    resolver: zodResolver(ocrKeysFormSchema),
    mode: 'onChange',
    defaultValues: {
      keys: initialKeys.length > 0 ? initialKeys : [{ id: crypto.randomUUID(), key: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'keys',
  })

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      reset({
        keys: initialKeys.length > 0 ? initialKeys : [{ id: crypto.randomUUID(), key: '' }],
      })
    }
  }, [open, initialKeys, reset])

  const handleFormSubmit = (data: OcrKeysFormData) => {
    onSubmit(data.keys)
    onOpenChange(false)
  }

  const handleAddKey = () => {
    append({ id: crypto.randomUUID(), key: '' })
  }

  const handleRemoveKey = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add OCR Keys</DialogTitle>
          <DialogDescription>
            Specify the keys you're looking for in <span className="font-medium text-gray-700">{fileName}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 mt-4">
          <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="mx-3 flex items-start gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      {...register(`keys.${index}.key`)}
                      placeholder={`Key ${index + 1} (e.g., Invoice Number, Date, Total)`}
                      className={cn(
                        'w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors',
                        errors.keys?.[index]?.key
                          ? 'border-red-500'
                          : 'border-gray-300'
                      )}
                    />
                  </div>
                  {errors.keys?.[index]?.key && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.keys[index]?.key?.message}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveKey(index)}
                  disabled={fields.length === 1}
                  className={cn(
                    'mt-1',
                    fields.length === 1 && 'opacity-40 cursor-not-allowed'
                  )}
                  aria-label={`Remove key ${index + 1}`}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            ))}
          </div>

          {errors.keys && typeof errors.keys.message === 'string' && (
            <p className="text-red-500 text-sm">{errors.keys.message}</p>
          )}

          <Button
            type="button"
            variant="outline"
            onClick={handleAddKey}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Key
          </Button>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              className="bg-black text-white hover:bg-black/90"
            >
              Confirm Keys
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
