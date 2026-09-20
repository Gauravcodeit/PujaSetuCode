export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  gotra?: string;
  role: 'user' | 'pandit' | 'admin';
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  gotra?: string;
}
