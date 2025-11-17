import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import defaultInstance from '@/core/network/axios';
import { AxiosError } from 'axios';
import type {
  OcrUploadPayload,
  OcrUploadResponse,
} from '@/core/models/OCRModels';

const uploadOcrData = async (
  payload: OcrUploadPayload
): Promise<OcrUploadResponse> => {
  const formData = new FormData();

  formData.append('image', payload.image);
  formData.append('keys_to_extract', JSON.stringify(payload.keys_to_extract));

  const { data } = await defaultInstance.post<OcrUploadResponse>(
    '/webhook-test/eb67ca23-48ba-4848-93a1-10d80073dfbe',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data;
};

export const useOcrUpload = (
  options?: Omit<
    UseMutationOptions<OcrUploadResponse, AxiosError, OcrUploadPayload>,
    'mutationFn'
  >
) => {
  return useMutation<OcrUploadResponse, AxiosError, OcrUploadPayload>({
    mutationFn: uploadOcrData,
    ...options,
  });
};
