
import { Rating } from './Rating';

export interface Service {
    id?: string;
    name: string;
    description: string;
    averageRating?: number;
    phoneNo: string;
    userId?: string;

    // ratings?: Rating[];
  }