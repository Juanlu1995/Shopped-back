import {Router} from "express";
import customerRouter from "./customerRouter";
import itemRouter from "./itemRouter";
import swaggerRouter from "./swaggerRouter";

const router = Router();

router.use("/customer", customerRouter);
router.use("/item", itemRouter);
router.use("/swagger", swaggerRouter);

export default router;
