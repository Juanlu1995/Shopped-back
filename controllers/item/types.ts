export interface Item {
  id: number;
  name: string;
  price?: number;
  measure_unit?: string; // FIXME - Should be an enum
  created_at: Date;
  updated_at: Date;
  deleted_at?: string;
}

export type CreateItem = Omit<
  Item,
  "created_at" | "updated_at" | "deleted_at" | "id"
>;

export interface DBItem
  extends Omit<
    Item,
    "created_at" | "updated_at" | "deleted_at" | "price" | "measure_unit"
  > {
  price: null | number;
  measure_unit: null | string;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
}
