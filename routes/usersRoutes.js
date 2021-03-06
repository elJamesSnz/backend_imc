//se accede al controlador
const UsersController = require("../controllers/usersControllers");

module.exports = (app) => {
  //GET para traer datos
  app.get("/api/users/getAll", UsersController.getAll);

  //POST para crear / registrar datos
  app.post("/api/users/create", UsersController.register);

  //POST para registrar IMC
  app.post("/api/users/imc", UsersController.addIMC);

  //POST para hacer login y recuperar inicio de sesión JWT
  app.post("/api/users/login", UsersController.login);
};
