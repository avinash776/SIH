import { apiClient } from './api';

// Types
export interface TranscriptionResponse {
  text: string;
  language: string;
  confidence: number;
  segments: Array<{
    start: number;
    end: number;
    text: string;
  }>;
}

export interface TTSRequest {
  text: string;
  language?: string;
  slow?: boolean;
}

export interface VoiceQueryResponse {
  transcription: TranscriptionResponse;
  query_text: string;
  response_text: string;
  response_audio_url: string;
}

export interface SupportedLanguages {
  languages: Record<string, string>;
}

// Audio Service
export class AudioService {
  async transcribeAudio(file: File, language?: string): Promise<TranscriptionResponse> {
    const additionalData: Record<string, string> = {};
    if (language) {
      additionalData.language = language;
    }

    return apiClient.uploadFile<TranscriptionResponse>('/audio/transcribe', file, additionalData);
  }

  async generateSpeech(request: TTSRequest): Promise<Blob> {
    const params = new URLSearchParams({
      text: request.text,
      language: request.language || 'en',
      slow: (request.slow || false).toString()
    });
    return apiClient.downloadFile(`/audio/tts?${params.toString()}`);
  }

  async generateLessonAudio(lessonId: number, language = 'en'): Promise<Blob> {
    return apiClient.downloadFile(`/audio/tts/lesson/${lessonId}?language=${language}`);
  }

  async processVoiceQuery(audioFile: File, targetLanguage = 'en'): Promise<VoiceQueryResponse> {
    const additionalData = { target_language: targetLanguage };
    return apiClient.uploadFile<VoiceQueryResponse>('/audio/voice-query', audioFile, additionalData);
  }

  async getTTSLanguages(): Promise<SupportedLanguages> {
    return apiClient.get<SupportedLanguages>('/audio/languages/tts');
  }

  async getWhisperLanguages(): Promise<SupportedLanguages> {
    return apiClient.get<SupportedLanguages>('/audio/languages/whisper');
  }

  // Helper method to create TTS audio URL
  createTTSUrl(text: string, language = 'en', slow = false): string {
    const params = new URLSearchParams({ text, language, slow: slow.toString() });
    return `http://localhost:8000/api/v1/audio/tts?${params.toString()}`;
  }

  // Helper method for playing audio
  async playAudio(audioBlob: Blob): Promise<HTMLAudioElement> {
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    return new Promise((resolve, reject) => {
      audio.onloadeddata = () => resolve(audio);
      audio.onerror = () => reject(new Error('Failed to load audio'));
      audio.load();
    });
  }

  // Helper method for recording audio
  async startRecording(): Promise<MediaRecorder> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      return mediaRecorder;
    } catch (error) {
      throw new Error('Microphone access denied or not available');
    }
  }

  // Helper method to convert recorded audio to file
  recordingToFile(chunks: Blob[], filename = 'recording.webm'): File {
    const blob = new Blob(chunks, { type: 'audio/webm' });
    return new File([blob], filename, { type: 'audio/webm' });
  }
}

export const audioService = new AudioService();