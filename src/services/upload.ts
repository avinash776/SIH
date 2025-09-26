import { apiClient } from './api';

// Types
export interface UploadedFile {
  id: number;
  filename: string;
  original_filename: string;
  file_size: number;
  file_type: string;
  upload_status: string;
  uploaded_at: string;
  file_url: string;
}

export interface FileListResponse {
  files: UploadedFile[];
  total_count: number;
}

export interface FileUploadProgress {
  filename: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
}

// Upload Service
export class UploadService {
  async uploadFile(file: File, description?: string): Promise<UploadedFile> {
    const additionalData: Record<string, string> = {};
    if (description) {
      additionalData.description = description;
    }

    return apiClient.uploadFile<UploadedFile>('/upload/file', file, additionalData);
  }

  async uploadMultipleFiles(files: File[]): Promise<UploadedFile[]> {
    // Note: This would need to be implemented in the backend to handle multiple files
    // For now, we'll upload them one by one
    const results: UploadedFile[] = [];
    
    for (const file of files) {
      try {
        const result = await this.uploadFile(file);
        results.push(result);
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        // You might want to return partial results or handle errors differently
      }
    }
    
    return results;
  }

  async getUploadedFiles(
    skip = 0,
    limit = 50,
    fileType?: string,
    status?: string
  ): Promise<FileListResponse> {
    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString()
    });

    if (fileType) params.append('file_type', fileType);
    if (status) params.append('status', status);

    return apiClient.get<FileListResponse>(`/upload/files?${params.toString()}`);
  }

  async deleteFile(fileId: number): Promise<{ message: string }> {
    return apiClient.delete(`/upload/files/${fileId}`);
  }

  async getFileStatus(fileId: number): Promise<{
    id: number;
    filename: string;
    status: string;
    progress: number;
    uploaded_at: string;
    processed_at?: string;
  }> {
    return apiClient.get(`/upload/files/${fileId}/status`);
  }

  // Helper method for file validation
  validateFile(file: File, maxSizeBytes = 100 * 1024 * 1024): { valid: boolean; error?: string } {
    const allowedTypes = ['.pdf', '.docx', '.txt', '.mp3', '.wav', '.mp4', '.avi'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!allowedTypes.includes(fileExtension)) {
      return {
        valid: false,
        error: `File type not supported. Allowed types: ${allowedTypes.join(', ')}`
      };
    }

    if (file.size > maxSizeBytes) {
      return {
        valid: false,
        error: `File size too large. Maximum size: ${Math.round(maxSizeBytes / (1024 * 1024))}MB`
      };
    }

    return { valid: true };
  }

  // Helper method to format file size
  formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }
}

export const uploadService = new UploadService();