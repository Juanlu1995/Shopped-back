import {database} from "../../database";
import {CreateItem, DBItem, Item} from "./types";

const TABLE = "item";

export const getItem = async (id: number) => {
    try {
        const query = `SELECT * FROM ${TABLE} WHERE id=${id} AND deleted_at IS NULL LIMIT 1`;
        console.log(query);
        const response = await database.query<DBItem[]>(query);
        if (!Array.isArray(response) || response.length === 0)
            throw new Error(`Non item found with id: ${id}`);
        return response[0];
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const getItemByName = async (name: string) => {
    try {
        const response = await database.query<DBItem[]>(
            `SELECT * FROM ${TABLE} WHERE name='${name}' AND deleted_AT IS NULL`
        );
        if (!Array.isArray(response) || response.length === 0)
            throw new Error(`Non item found with name: ${name}`);
        return response[0];
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const getItems = async () => {
    try {
        const response = await database.query<DBItem[]>(`SELECT * FROM ${TABLE}`);
        if (!Array.isArray(response) || response.length === 0)
            throw new Error(`Non items found`);
        return response;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const createItem = async (item: CreateItem) => {
    try {
        const keys = Object.keys(item);
        const values = Object.values(item);
        const response = await database.query<DBItem[]>(
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

export const deleteItem = async (itemID: number) => {
    try {
        await database.query(`DELETE FROM ${TABLE} WHERE id = ${itemID} AND deleted_at IS NULL`);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const updateItem = (item: Item) => {
    // TODO - Update functionality should be implement
};
