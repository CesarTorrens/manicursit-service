import { Service } from "./Service";

export interface MyTurn {
  createAt: string;
  updateAt: string;
  id: string;
  date: string;
  clientName: string;
  service: Service;
}
