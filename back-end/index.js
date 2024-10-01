import express from "express";
import {mongoDBURL_local, PORT} from "./config.js";
import mongoose from "mongoose";

const app = express();


app.listen(PORT, () => {
    console.log(`Servidor iniciado com sucesso! Ouvindo na porta: ${PORT}`);
});

app.get('/', (request,response) => {
    //console.log(request);
    return response.status(234).send('Vamos vencer essa luta!');
});

mongoose.connect(mongoDBURL_local, {})
.then(() => {
    console.log('Conexao com mongoDB realizada com sucesso!');
})
.catch((error) => {
    console.error('Erro ao conectar ao mongoDB:', error)
});
