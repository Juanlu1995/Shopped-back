import { Customer } from "./controllers/customer/types";

export interface ServerToClientEvents {
  foundedCustomers: (customers: Customer[]) => void;
}

export interface ClientToServerEvents {
  searchCustomers: (customer: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

