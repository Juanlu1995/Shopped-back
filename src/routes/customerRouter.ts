import {Request, Router} from "express";

import {CreateCustomer} from "../controllers/customer/types";
import CustomerController from "../controllers/customer";

const customerRouter = Router();
const customer = new CustomerController();


customerRouter.get("/", async (_, res) => {
    const customers = await customer.getCustomers();

    res.json(customers);
});

customerRouter.get('/name/:name', async (req: Request<{ name: string }>, res) => {

})

customerRouter.post("/", async (req: Request<{}, {}, CreateCustomer>, res) => {
    if (!req.body.name) {
        return res.status(400).send();
    }
    const result = await customer.createCustomer(req.body);

    if (result) {
        return res.status(201).json(result[0]);
    }
    return res.status(500).send();
});

export default customerRouter;
