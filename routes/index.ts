import { Router } from "express";
import customerRouter from "./customerRouter";
import itemRouter from "./itemRouter";

const router = Router();

router.use("/customer", customerRouter);
router.use("/item", itemRouter);

export default router;
