import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import fs from "fs";

// routes
import routers from "./routes/index.js";

/* CONFIGURATIONS */
// const swaggerOptions = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Hello World',
//             version: '1.0.0',
//         },
//     },
//     apis: ['./routes/*.js'],
// };
//
// const openapiSpecification = swaggerJsdoc(swaggerOptions);
const app = express();
const PORT = 8000;

const file  = fs.readFileSync('./swagger.yml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json({limit: "10mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "10mb", extended: true}));
app.use(cors());

app.use("/", routers);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});