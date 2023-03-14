import { User } from './User';
import { Rating } from './Rating';

export interface Service {
    id?: string;
    name: string;
    description: string;
    averageRating?: number;
    phoneNo: string;
    // ratings?: Rating[];
    // user?: User;
  }