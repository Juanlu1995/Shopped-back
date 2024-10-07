import { Socket } from "socket.io";
import { database } from "../../database";
import { CreateCustomer, Customer } from "./types";
import debounce from "lodash/debounce";

const TABLE = "customer";

const getCustomers = async (): Promise<Customer[]> => {
  try {
    return await database.query(`SELECT * FROM ${TABLE}`);
  } catch (error) {
    return [];
  }
};

export const findCustomers = debounce((name: string, socket: Socket) => {
  try {
    if(name !== '') {
      database
      .query<Customer[]>(
        `SELECT * FROM "${TABLE}" WHERE LOWER(name) LIKE LOWER('%${name}%')`
      )
      .then((response) => {
        socket.emit("foundedCustomers", response);
      });
    } else {
      socket.emit("foundedCustomers", []);
    }
  } catch (e) {
    console.error(e);
    socket.emit("foundedCustomers", []);
  }
}, 500);

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
