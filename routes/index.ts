import { Router } from "express";
import customerRouter from "./customerRouter";

const router = Router();

router.use("/customer", customerRouter);

export default router;
