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

// Profile Service
export class ProfileService {
  // Get current user's profile
  static async getMyProfile(): Promise<ApiResponse<ProfileData>> {
    return apiClient.get<ProfileData>('/profile/me');
  }

  // Update profile
  static async updateProfile(data: Partial<ProfileData>): Promise<ApiResponse<ProfileData>> {
    return apiClient.patch<ProfileData>('/profile/me', data);
  }

  // Get profile by ID
  static async getProfileById(id: string): Promise<ApiResponse<ProfileData>> {
    return apiClient.get<ProfileData>(`/profile/${id}`);
  }

  // Upload profile photo
  static async uploadPhoto(file: File, isMain: boolean = false): Promise<ApiResponse<ProfilePhoto>> {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('isMain', isMain.toString());

    return apiClient.post<ProfilePhoto>('/profile/photos', formData);
  }

  // Get profile photos
  static async getPhotos(): Promise<ApiResponse<ProfilePhoto[]>> {
    return apiClient.get<ProfilePhoto[]>('/profile/photos');
  }

  // Delete photo
  static async deletePhoto(photoId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/profile/photos/${photoId}`);
  }

  // Set main photo
  static async setMainPhoto(photoId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.patch<{ message: string }>(`/profile/photos/${photoId}/main`);
  }

  // Update preferences
  static async updatePreferences(preferences: ProfilePreferences): Promise<ApiResponse<ProfilePreferences>> {
    return apiClient.patch<ProfilePreferences>('/profile/preferences', preferences);
  }

  // Get preferences
  static async getPreferences(): Promise<ApiResponse<ProfilePreferences>> {
    return apiClient.get<ProfilePreferences>('/profile/preferences');
  }

  // Search profiles
  static async searchProfiles(filters?: Partial<ProfilePreferences>): Promise<ApiResponse<ProfileData[]>> {
    const queryParams = filters ? `?${new URLSearchParams(filters as any).toString()}` : '';
    return apiClient.get<ProfileData[]>(`/profile/search${queryParams}`);
  }

  // Get profile completion status
  static async getCompletionStatus(): Promise<ApiResponse<{ percentage: number; missingFields: string[] }>> {
    return apiClient.get<{ percentage: number; missingFields: string[] }>('/profile/completion');
  }
}
