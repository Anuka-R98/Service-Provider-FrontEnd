import { User } from './User';

export interface Rating {
    id?: string;
    rating: number;
    comment?: string;
    userId: string;
    serviceId: string;
    userName?: string;
    serviceName?: string;
  }
  