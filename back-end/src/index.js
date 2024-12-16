import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as Config from "./config.js";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import bikeRoutes from "./routes/bikeRoutes.js";
import rentRoutes from "./routes/rentRoutes.js";
import { httpStatusCode } from './enums/httpStatusCode.js';
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(Config.PORT, () => {
    console.log("Servidor iniciado com sucesso! Ouvindo na porta:", Config.PORT);
});

mongoose.connect(Config.mongoDBURL_local, {})
    .then(() => {
        console.log("Conexao com mongoDB realizada com sucesso!");
    })
    .catch((error) => {
        console.error("Erro ao conectar ao mongoDB:", error);
    });

app.use('/users', userRoutes);
app.use('/bikes', bikeRoutes);
app.use('/rents', rentRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'internal server error' });
});
