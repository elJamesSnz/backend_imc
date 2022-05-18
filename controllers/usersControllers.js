//recuperar usuario
const User = require("../models/user");
const IMC = require("../models/imc");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = {
  //petición asíncrona para todos los usuarios
  async getAll(req, res, next) {
    try {
      const data = await User.getAll();
      console.log(`Usuarios: ${data}`);
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener todos los usuarios",
      });
    }
  },
  //petición asíncrona para insertar nuevos usuarios
  async register(req, res, next) {
    try {
      const user = req.body;

      //se espera a que se termine el  proceso
      const data = await User.create(user);
      //Establecer IMC CLIENTE (id 1) por defecto
      //await IMC.create(data.id, data.id_imc, data.imc_value);

      return res.status(201).json({
        success: true,
        message: "Registro realizado. Inicia sesión.",
        data: data.id,
      });
    } catch (error) {
      console.log(`${error}`);
      return res.status(501).json({
        success: false,
        message: "Error con el registro",
        error: error,
      });
    }
  },
  //petición asíncrona para hacer el login de un usuario
  async login(req, res, next) {
    try {
      //Se recuperan las variables del vody de la request
      const email = req.body.email;
      const password = req.body.password;
      //Se busca el usuario por el email recibido
      const rUser = await User.FindByEmail(email);

      //si no hay usuario con ese email
      if (!rUser) {
        return res.status(401).json({
          success: false,
          message: "El email no fue encontrado",
          error: error,
        });
      }

      //si la contraseña enviada por el usuario es igual a la cifrada en DB
      if (User.isPwMatched(password, rUser.password)) {
        const token = jwt.sign(
          { id: rUser.id, email: rUser.email },
          //Token de sesión se le puede asignar expiración
          keys.secretOrKey,
          {
            //Duración de una hora
            //expiresIn: 60 * 60 * 24,
          }
        );

        console.log(rUser.imcs);

        const data = {
          id: rUser.id,
          name: rUser.name,
          lastname: rUser.lastname,
          email: rUser.email,
          phone: rUser.phone,
          image: rUser.image,
          session_token: `JWT ${token}`,
          //reverse para mostrar el último registrado aka el más reciente.
          medidas: rUser.imcs.reverse(),
          //medidas: rUser.imcs,
        };

        return res.status(201).json({
          success: true,
          data: data,
          message: "Ingreso correcto",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "La contraseña es incorrecta",
        });
      }
    } catch (error) {
      console.log(`Error login. ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al hacer login",
        error: error,
      });
    }
  },
  //petición asíncrona para insertar nuevos usuarios
  async addIMC(req, res, next) {
    try {
      const med = req.body;

      //se espera a que se termine el  proceso
      const data = await User.addIMC(med);
      //Establecer IMC CLIENTE (id 1) por defecto
      //await IMC.create(data.id, data.id_imc, data.imc_value);

      return res.status(201).json({
        success: true,
        message: "Registro de IMC realizado.",
      });
    } catch (error) {
      console.log(`${error}`);
      return res.status(501).json({
        success: false,
        message: "Error con el registro",
        error: error,
      });
    }
  },
};
