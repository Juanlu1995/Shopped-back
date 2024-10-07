import { database } from "../../database";
import { CreateItem, DBItem, Item } from "./types";
const TABLE = "item";

const getItem = async (id: number) => {
  try {
    const response = await database.query<DBItem[]>(
      `SELECT * FROM ${TABLE} WHERE id=${id} LIMIT 1`
    );
    if (!Array.isArray(response) || response.length === 0)
      throw new Error(`Non item found with id: ${id}`);
    return response[0];
  } catch (e) {
    console.error(e);
    return null;
  }
};

const getItemByName = async (name: string) => {
  try {
    const response = await database.query<DBItem[]>(
      `SELECT * FROM ${TABLE} WHERE name='${name}'`
    );
    if (!Array.isArray(response) || response.length === 0)
      throw new Error(`Non item found with name: ${name}`);
    return response[0];
  } catch (e) {
    console.error(e);
    return null;
  }
};

const getItems = async () => {
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

const createItem = async (item: CreateItem) => {
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

const removeItem = async (itemID: number) => {
  try {
    await database.query(`DELETE FROM ${TABLE} WHERE id = ${itemID}`);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const updateItem = (item: Item) => {
  // TODO - Update functionality should be implement
};

export default {
  getItem,
  getItems,
  createItem,
  removeItem,
  updateItem,
  getItemByName,
};
