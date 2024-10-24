import {CreateCustomer, Customer} from "./types";
import {database} from "../../database";

const TABLE = "customer";

export const getCustomers = async (): Promise<Customer[]> => {
    try {
        return await database.query(`SELECT * FROM ${TABLE}`);
    } catch (error) {
        return [];
    }
};

export const findCustomers = async (name: string) => {
    try {
        return await database
            .query<Customer[]>(
                `SELECT * FROM "${TABLE}" WHERE LOWER(name) LIKE LOWER('%${name}%')`
            )
    } catch (error) {
        console.error(error);
        return []
    }
}

export const createCustomer = async (customer: CreateCustomer) => {
    try {
        const keys = Object.keys(customer);
        const values = Object.values(customer);
        const response = await database.query<Customer[]>(
            `INSERT INTO ${TABLE} (${keys.toString()}) VALUES (${values.map(
                (val) => `'${val}'`
            )}) RETURNING *`
        );
        return response;
    } catch (e) {
        console.error(e);
        return null;
    }
};
