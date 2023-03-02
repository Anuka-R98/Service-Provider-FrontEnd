import { User } from './User';
import { Rating } from './Rating';

export interface Service {
    id: string;
    name: string;
    description: string;
    ratings: Rating[];
    user: User;
    averageRating: number;
  }