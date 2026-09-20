export interface Puja {
  _id: string;
  title: string;
  slug: string;
  badge: string;
  description: string;
  category: string;
  duration: string;
  panditsCount: string;
  startingPrice: number;
  samagriPrice: number;
  icon: string;
  bgEmoji: string;
  themeColor: string;
  includesText: string;
  checklist?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PujaResponse {
  success: boolean;
  count: number;
  data: Puja[];
}

export interface SinglePujaResponse {
  success: boolean;
  data: Puja;
}
