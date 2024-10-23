import {Request, Router} from "express";

import {CreateCustomer} from "../controllers/customer/types";
import customer from "../controllers/customer";

const customerRouter = Router();

customerRouter.get("/", async (_, res) => {
    const customers = await customer.getCustomers();

    res.json(customers);
});

customerRouter.get('/name/:name', async (req: Request<{ name: string }>, res) => {
    if (!req.params.name) return res.status(400).send();

    const customers = await customer.findCustomers(req.params.name);

    if (!customers.length) return res.status(404).send();
    res.json(customers);
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
