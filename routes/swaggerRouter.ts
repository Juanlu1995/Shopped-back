import swaggerDocs from "../controllers/swagger";
import swaggerUI from 'swagger-ui-express';
import {Router} from "express";

const swaggerRouter = Router();

swaggerRouter.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

export default swaggerRouter;