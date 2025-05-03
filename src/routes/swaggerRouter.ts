import swaggerUI from 'swagger-ui-express';
import {Router} from "express";

const swaggerRouter = Router();

swaggerRouter.use('/', swaggerUI.serve, swaggerUI.setup(
    undefined, {
        swaggerOptions: {
            url: "/swagger.json"
        }
    })
);

export default swaggerRouter;