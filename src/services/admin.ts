import { apiClient } from './api';

// Types
export interface AdminStats {
  total_courses: number;
  published_courses: number;
  total_lessons: number;
  total_users: number;
  total_translations: number;
  total_uploads: number;
  recent_uploads: Array<{
    id: number;
    filename: string;
    status: string;
    uploaded_at: string;
  }>;
}

export interface CourseCreate {
  title_en: string;
  description_en: string;
  category: string;
  level?: string;
  thumbnail_url?: string;
}

export interface LessonCreate {
  title_en: string;
  content_en: string;
  lesson_order: number;
  video_url?: string;
  duration_minutes?: number;
}

export interface TranslationPipelineRequest {
  content_id: number;
  content_type: 'course' | 'lesson';
  target_languages: string[];
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  preferred_language: string;
  is_admin: boolean;
  is_active: boolean;
  created_at: string;
}

// Admin Service
export class AdminService {
  async getAdminStats(): Promise<AdminStats> {
    return apiClient.get<AdminStats>('/admin/stats');
  }

  async createCourse(courseData: CourseCreate): Promise<{ id: number; message: string }> {
    return apiClient.post('/admin/courses', courseData);
  }

  async createLesson(courseId: number, lessonData: LessonCreate): Promise<{ id: number; message: string }> {
    return apiClient.post(`/admin/courses/${courseId}/lessons`, lessonData);
  }

  async publishCourse(courseId: number): Promise<{ message: string }> {
    return apiClient.post(`/admin/courses/${courseId}/publish`);
  }

  async startTranslationPipeline(request: TranslationPipelineRequest): Promise<{
    message: string;
    content_id: number;
    content_type: string;
    target_languages: string[];
  }> {
    return apiClient.post('/admin/translation-pipeline', request);
  }

  async getUsers(skip = 0, limit = 50): Promise<AdminUser[]> {
    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString()
    });

    return apiClient.get<AdminUser[]>(`/admin/users?${params.toString()}`);
  }

  async toggleAdminStatus(userId: number): Promise<{ message: string }> {
    return apiClient.put(`/admin/users/${userId}/admin`);
  }

  async deleteCourse(courseId: number): Promise<{ message: string }> {
    return apiClient.delete(`/admin/courses/${courseId}`);
  }

  // Helper methods for admin operations
  validateCourseData(data: CourseCreate): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.title_en || data.title_en.trim().length < 3) {
      errors.push('Title must be at least 3 characters long');
    }

    if (!data.description_en || data.description_en.trim().length < 10) {
      errors.push('Description must be at least 10 characters long');
    }

    if (!data.category || data.category.trim().length < 2) {
      errors.push('Category is required');
    }

    const validLevels = ['Beginner', 'Intermediate', 'Advanced'];
    if (data.level && !validLevels.includes(data.level)) {
      errors.push('Level must be one of: Beginner, Intermediate, Advanced');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  validateLessonData(data: LessonCreate): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.title_en || data.title_en.trim().length < 3) {
      errors.push('Lesson title must be at least 3 characters long');
    }

    if (!data.content_en || data.content_en.trim().length < 20) {
      errors.push('Lesson content must be at least 20 characters long');
    }

    if (data.lesson_order < 1) {
      errors.push('Lesson order must be a positive number');
    }

    if (data.duration_minutes !== undefined && data.duration_minutes < 0) {
      errors.push('Duration must be a non-negative number');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

export const adminService = new AdminService();