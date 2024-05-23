import express from "express";
import { create } from 'express-handlebars';
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//INSTANCIA DE EXPRESS
const app = express();
app.listen(3001, () => {
    console.log("Servidor escuchando en https://localhost:3001");
});

//INICIO CONFIGURACION HANDLEBARS 
const hbs = create({
    partialsDir: [
        path.resolve(__dirname, "./views/partials/"),
    ],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//INICIO MIDDLEWARES
app.use(express.static("public"));

//dejar públicos los archivos de bootstrap y jquery 
app.use('/bootstrap', express.static(path.join(__dirname,"node_modules/bootstrap/dist")));
app.use('/jquery', express.static(path.join(__dirname,"node_modules/jquery/dist")));

//RUTAS DE VISITAS

app.get("/", (req, res) => {
    res.render("home", {
        titulo: "Bienvenido al <strong>Mercado Web</>, seleccione sus productos",
        productos:["banana", "cebollas", "lechuga", "papas", "pimenton", "tomate"]
    });
})