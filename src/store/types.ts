import { Service } from 'app/types/Service';

export interface Quote {
  service: Service | null;
  clientName: string | null;
  date: Date | null;
}
