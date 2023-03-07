import { User } from './User';

export interface Rating {
    id: string;
    rating: number;
    comment: string;
    user: User;
  }
  