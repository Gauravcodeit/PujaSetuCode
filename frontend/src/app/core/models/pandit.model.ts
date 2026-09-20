export interface Pandit {
  _id: string;
  name: string;
  initials: string;
  gurukul: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  tradition: string;
  languages: string[];
  includes: string;
  dakshina: number;
  phone: string;
  verified: boolean;
  avatarBg?: string;
  pujas?: any[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PanditResponse {
  success: boolean;
  count: number;
  data: Pandit[];
}

export interface SinglePanditResponse {
  success: boolean;
  data: Pandit;
}
