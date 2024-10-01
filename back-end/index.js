import express from "express";
import {PORT} from "./config.js";

const app = express();

app.get('/', (request,response) => {
    //console.log(request);
    return response.status(234).send('Vamos vencer essa luta!');
});

app.listen(PORT, () => {
    console.log(`Ouvindo na porta: ${PORT}`);
});
 
