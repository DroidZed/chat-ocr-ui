export type OcrUploadPayload = {
  keys_to_extract: string[];
  image: File;
};

export type OcrUploadResponse = {
  hash_key: string
  extracted_text: string
  keys_to_extract: KeysToExtract
  ai_response: AiResponse
  created_at: string
}

type KeysToExtract = {
  fields: string
}

type AiResponse = {
  [key: string]: any
}
