import { apiClient, ApiResponse } from '../lib/api';

// Profile Types
export interface ProfileData {
  // Basic Information
  fullName: string;
  username?: string;
  nickname?: string;
  dob: string;
  gender: 'male' | 'female';
  height: number;
  emails: string[];
  phone: string;
  maritalStatus: string;
  ethnicOrigin: string;
  nationality: string;

  // Family Information
  numberOfChildren: number;
  numberOfSiblings: number;
  likeToHaveChildren: boolean;

  // Address Information
  currentAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
  backHomeAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
  isWillingToRelocate: boolean;

  // Religious Information
  religion: string;
  sect: string;
  schoolOfThoughts: string;
  religious_history: string;
  prayerFrequency: string;
  eatHalal: boolean;
  wearHijabKeepBeard: boolean;
  quranReadingStatus: string;

  // Lifestyle Information
  smoke: boolean;
  drinkAlcohol: boolean;
  fitness: string;
  hairColor: string;
  recidencyStatus: string;
  currentLivingStatus: string;
  physicalDisability: boolean;
  continueWorking: boolean;

  // Bio and Future Plans
  bio?: string;
  futurePlans?: string;
}

export interface ProfilePhoto {
  id: string;
  url: string;
  isMain: boolean;
  order: number;
}

export interface ProfilePreferences {
  ageRange: { min: number; max: number };
  heightRange: { min: number; max: number };
  maritalStatus: string[];
  countries: string[];
  eatHalal: 'any' | 'yes' | 'no';
  smoke: 'any' | 'yes' | 'no';
  drinkAlcohol: 'any' | 'yes' | 'no';
  wearHijabKeepBeard: 'any' | 'yes' | 'no';
}

// Profile Response Types
export interface ProfileResponse {
  success: boolean;
  message?: string;
  data?: ProfileData;
  error?: {
    code: string;
    message: string;
    details: any[];
  };
}

export interface ProfileListResponse {
  success: boolean;
  message?: string;
  data?: ProfileData[];
  error?: {
    code: string;
    message: string;
    details: any[];
  };
}

export interface ProfileCompletionResponse {
  success: boolean;
  message?: string;
  data?: { percentage: number; missingFields: string[] };
  error?: {
    code: string;
    message: string;
    details: any[];
  };
}

// Profile Service
export class ProfileService {
  // Get current user's profile
  static async getMyProfile(): Promise<ProfileResponse> {
    return apiClient.get<ProfileResponse>('/api/profile/me');
  }

  // Update profile
  static async updateProfile(data: Partial<ProfileData>): Promise<ProfileResponse> {
    return apiClient.patch<ProfileResponse>('/api/profile/me', data);
  }

  // Get profile by ID
  static async getProfileById(id: string): Promise<ProfileResponse> {
    return apiClient.get<ProfileResponse>(`/api/profile/${id}`);
  }

  // Upload profile photo
  static async uploadPhoto(file: File, isMain: boolean = false): Promise<ProfileResponse> {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('isMain', isMain.toString());

    return apiClient.post<ProfileResponse>('/api/profile/photos', formData);
  }

  // Get profile photos
  static async getPhotos(): Promise<ProfileListResponse> {
    return apiClient.get<ProfileListResponse>('/api/profile/photos');
  }

  // Delete photo
  static async deletePhoto(photoId: string): Promise<ProfileResponse> {
    return apiClient.delete<ProfileResponse>(`/api/profile/photos/${photoId}`);
  }

  // Set main photo
  static async setMainPhoto(photoId: string): Promise<ProfileResponse> {
    return apiClient.patch<ProfileResponse>(`/api/profile/photos/${photoId}/main`);
  }

  // Update preferences
  static async updatePreferences(preferences: ProfilePreferences): Promise<ProfileResponse> {
    return apiClient.patch<ProfileResponse>('/api/profile/preferences', preferences);
  }

  // Get preferences
  static async getPreferences(): Promise<ProfileResponse> {
    return apiClient.get<ProfileResponse>('/api/profile/preferences');
  }

  // Search profiles
  static async searchProfiles(filters?: Partial<ProfilePreferences>): Promise<ProfileListResponse> {
    const queryParams = filters ? `?${new URLSearchParams(filters as any).toString()}` : '';
    return apiClient.get<ProfileListResponse>(`/api/profile/search${queryParams}`);
  }

  // Get profile completion status
  static async getCompletionStatus(): Promise<ProfileCompletionResponse> {
    return apiClient.get<ProfileCompletionResponse>('/api/profile/completion');
  }

  // Onboarding Step Methods (20% each step)
  static async updateProfileStep1(data: any): Promise<ProfileResponse> {
    return apiClient.patch<ProfileResponse>('/api/profile/onboarding/step-1', data);
  }

  static async updateProfileStep2(data: any): Promise<ProfileResponse> {
    return apiClient.patch<ProfileResponse>('/api/profile/onboarding/step-2', data);
  }

  static async updateProfileStep3(data: any): Promise<ProfileResponse> {
    return apiClient.patch<ProfileResponse>('/api/profile/onboarding/step-3', data);
  }

  static async updateProfileStep4(data: any): Promise<ProfileResponse> {
    return apiClient.patch<ProfileResponse>('/api/profile/onboarding/step-4', data);
  }

  static async updateProfileStep5(formData: FormData): Promise<ProfileResponse> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_BASE_URL}/api/profile/onboarding/step-5`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type for FormData - browser will set it with boundary
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

}
