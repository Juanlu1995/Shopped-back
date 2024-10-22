import {database} from "../../database";
import {CreateCustomer, Customer} from "./types";

const TABLE = "customer";

const getCustomers = async (): Promise<Customer[]> => {
    try {
        return await database.query(`SELECT * FROM ${TABLE}`);
    } catch (error) {
        return [];
    }
};

const findCustomers = async (name: string) => {
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

const createCustomer = async (customer: CreateCustomer) => {
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

export default {
    getCustomers,
    createCustomer,
    findCustomers,
};
