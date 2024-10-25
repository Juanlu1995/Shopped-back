/**
 * Item interface
 */
export interface Item {
  id: number;
  name: string;
  price?: number;
  measure_unit?: string; // FIXME - Should be an enum
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

/**
 * Interface to create an item.
 * Only have the values need to create a new item
 */
export interface CreateItem extends Omit<
  Item,
  "created_at" | "updated_at" | "deleted_at" | "id"
>{}

/**
 * Interface of returned elements
 */
export interface DBItem
  extends Omit<
    Item,
     "price" | "measure_unit"
  > {
  price: null | number;
  measure_unit: null | string;
}
