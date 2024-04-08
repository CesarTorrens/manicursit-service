import { Service } from './Service';

export interface QuoteRequest {
  date: Date;
  clientName: string;
  service: Service;
  createAt: string;
  updateAt: string;
  id: string;
}
