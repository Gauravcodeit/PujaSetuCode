import { Puja } from './puja.model';
import { Pandit } from './pandit.model';

export interface DevoteeInfo {
  fullName: string;
  gotra?: string;
  phone: string;
  email: string;
}

export interface VenueAddress {
  flat: string;
  city: string;
  pincode: string;
  landmark?: string;
}

export interface PricingBreakdown {
  dakshina: number;
  samagriFee: number;
  platformFee: number;
  totalAmount: number;
}

export interface Booking {
  _id?: string;
  bookingId: string;
  user?: string;
  puja: Puja | string;
  pandit: Pandit | string;
  pujaTitle: string;
  panditName: string;
  panditPhone: string;
  muhuratDate: string;
  muhuratSlot: string;
  devotee: DevoteeInfo;
  venue: VenueAddress;
  pricing: PricingBreakdown;
  status: 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  createdAt?: string;
}

export interface CreateBookingRequest {
  pujaId: string;
  panditId: string;
  muhuratDate: string;
  muhuratSlot: string;
  devotee: DevoteeInfo;
  venue: VenueAddress;
  notes?: string;
}

export interface BookingResponse {
  success: boolean;
  message?: string;
  data: Booking;
}

export interface BookingListResponse {
  success: boolean;
  count: number;
  data: Booking[];
}
