import { Role } from './Role';

export interface User {
    id?: string;
    username: string;
    email: string;
    password: string;
    phoneNo: string;
    roles: Role[];
  }
  
