import { apiClient } from './api';

// Types
export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  duration_hours: number;
  rating: number;
  thumbnail_url?: string;
  is_enrolled: boolean;
  progress_percentage: number;
  language: string;
}

export interface Lesson {
  id: number;
  title: string;
  content: string;
  lesson_order: number;
  duration_minutes: number;
  video_url?: string;
  audio_url?: string;
  completed: boolean;
}

export interface CourseDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  duration_hours: number;
  rating: number;
  thumbnail_url?: string;
  lessons: Lesson[];
  is_enrolled: boolean;
  progress_percentage: number;
  total_lessons: number;
  completed_lessons: number;
}

export interface CourseFilters {
  language?: string;
  category?: string;
  search?: string;
  level?: string;
}

// Course Service
export class CourseService {
  async getCourses(filters: CourseFilters = {}): Promise<Course[]> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiClient.get<Course[]>(`/courses${queryString}`);
  }

  async getCourseDetail(courseId: number, language = 'en'): Promise<CourseDetail> {
    return apiClient.get<CourseDetail>(`/courses/${courseId}?language=${language}`);
  }

  async enrollInCourse(courseId: number): Promise<{ message: string }> {
    return apiClient.post(`/courses/${courseId}/enroll`);
  }

  async markLessonComplete(
    courseId: number, 
    lessonId: number, 
    timeSpent = 0
  ): Promise<{ message: string; progress_percentage: number }> {
    return apiClient.post(`/courses/${courseId}/lessons/${lessonId}/complete`, {
      time_spent: timeSpent
    });
  }

  async getCategories(): Promise<string[]> {
    return apiClient.get<string[]>('/courses/categories');
  }
}

export const courseService = new CourseService();