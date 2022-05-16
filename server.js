const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");

const users = require("./routes/usersRoutes");
const port = process.env.PORT || 3000;

//debug de posibles errores
app.use(logger("dev"));
//parsear respuestas
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
//seguridad
app.disable("x-powered-by");

app.set("port", port);

/*
  LLAMANDO RUTAS
*/
users(app);

const IP = "192.168.47.1";

//ipconfig -> ipv4
server.listen(3000, IP || "localhost", function () {
  console.log(
    "Aplicación backend NodeJS " + process.pid + " Iniciada en puerto " + port
  );
});

//Error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

//exportar objeto con la aplicación el servidor y usarlos en otros archivos
module.exports = {
  app: app,
  server: server,
};

//200 - Mensaje / Respuesta exitosa
//404 - URL no existe
//500 - Error Interno del Servidor
