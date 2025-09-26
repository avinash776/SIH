import { apiClient } from './api';

// Types
export interface TranslationRequest {
  text: string;
  target_language: string;
  source_language?: string;
}

export interface TranslationResponse {
  translated_text: string;
  source_language: string;
  target_language: string;
  confidence: number;
  original_text: string;
}

export interface BatchTranslationRequest {
  texts: string[];
  target_language: string;
  source_language?: string;
}

export interface BatchTranslationResponse {
  translations: TranslationResponse[];
  success_count: number;
  total_count: number;
}

export interface SupportedLanguages {
  languages: Record<string, string>;
}

// Translation Service
export class TranslationService {
  async translate(request: TranslationRequest): Promise<TranslationResponse> {
    return apiClient.post<TranslationResponse>('/translation/translate', request);
  }

  async translateBatch(request: BatchTranslationRequest): Promise<BatchTranslationResponse> {
    return apiClient.post<BatchTranslationResponse>('/translation/translate/batch', request);
  }

  async getCachedTranslation(
    text: string, 
    targetLanguage: string, 
    sourceLanguage = 'en'
  ): Promise<TranslationResponse | { message: string }> {
    const params = new URLSearchParams({
      text,
      target_language: targetLanguage,
      source_language: sourceLanguage
    });

    return apiClient.get(`/translation/translate/cached?${params.toString()}`);
  }

  async getSupportedLanguages(): Promise<SupportedLanguages> {
    return apiClient.get<SupportedLanguages>('/translation/languages');
  }

  async clearTranslationCache(): Promise<{ message: string }> {
    return apiClient.delete('/translation/translate/cache');
  }
}

export const translationService = new TranslationService();