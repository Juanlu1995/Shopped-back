import dotenv from "dotenv";
import pgp, { IInitOptions } from "pg-promise";

dotenv.config({ path: ".env.database" });
const envs = process.env;

const initOptions: IInitOptions = {
    error(error, e) {
        if (e.cn) {
            console.log('CN:', e.cn);
            console.log('EVENT:', error.message || error);
        }
    }
};

const connect = pgp(initOptions);
export const database = connect(`postgresql://${envs.POSTGRES_USER}:${envs.POSTGRES_PASSWORD}@${envs.POSTGRES_HOST}:${envs.POSTGRES_PORT}/${envs.POSTGRES_DB}`)