import { Service } from './Service';

export interface Category {
  createAt: string;
  updateAt: string;
  id: string;
  name: string;
  status: boolean;
  services: Service[];
}
