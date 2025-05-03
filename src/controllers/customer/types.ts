/**
 * Customer interface
 */
export interface Customer {
    readonly id: number;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

/**
 * Interface of values to create a customer
 */
export type CreateCustomer = {
    name: Customer["name"]
};
