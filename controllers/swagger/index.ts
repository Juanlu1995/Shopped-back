import swaggerJsDoc from 'swagger-jsdoc';
import {port} from "../../constants";
import swaggerJSDoc from "swagger-jsdoc";
import path from 'node:path'

const routesPath = path.join(__dirname, '..', '..', 'routes');
const buildPath = (newPath: string) => path.join(routesPath, newPath);
console.log(buildPath('customerRouter.ts'))
const apis = [
    buildPath('customerRouter.ts'),
    buildPath('itemRouter.ts')
]

const swaggerOptions: swaggerJSDoc.Options = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Shopped API",
            description: "Swagger API",
            servers: [`http://localhost:${port}`]
        },
        basePath: '/'
    },
    apis
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

export default swaggerDocs;