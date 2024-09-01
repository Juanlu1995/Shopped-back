export interface Customer {
  readonly id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export type CreateCustomer = Pick<Customer, "name">;
