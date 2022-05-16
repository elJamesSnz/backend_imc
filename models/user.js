//recuperar el módulo db desde config para sentencias SQL
const db = require("../config/config");
//recuperar dependencia para encriptar las contraseñas
const crypto = require("crypto");

const User = {};

//sentencia SQL que recupera todos los usurios
User.getAll = () => {
  const sql = `
  SELECT 
  * 
  FROM 
  users`;

  return db.manyOrNone(sql);
};

//sentencia SQL que recupera un único usuario por I_D
User.findById = (id, callback) => {
  const sql = `
  SELECT
    id,
    email,
    name,
    lastname,
    image,
    phone,
    password,
    session_token
  FROM
	  users
  WHERE
	  id = $1`;

  return db.oneOrNone(sql, id).then((user) => {
    callback(null, user);
  });
};

//Sentencia SQL que recupera un único usuario por email
User.FindByEmail = (email) => {
  const sql = `
  SELECT
    U.id,
    U.email,
    U.name,
    U.lastname,
    U.image,
    U.phone,
    U.password,
    U.session_token,
    json_agg(
      json_build_object(
        'id', R.id,
        'name', R.name,
        'image', R.image,
        'route', R.route
      )
    ) AS imcs
  FROM
    users AS U  	
  INNER JOIN
    user_has_imcs as UHR
  ON
    UHR.id_user = U.id
  INNER JOIN
    imcs as R
  ON
    R.id = UHR.id_imc
  WHERE
    U.email = $1
  GROUP BY U.id
`;

  return db.oneOrNone(sql, email);
};

//sentencia SQL que crea nuevo usuario
User.create = (user) => {
  //se encripta en md5, update(pasamos el valor) digest para mantener formato hex
  const pwHash = crypto.createHash("md5").update(user.password).digest("hex");

  user.password = pwHash;
  const sql = `
    INSERT INTO
      users(
        email,
        name,
        lastname,
        phone,
        image,
        password,
        created_at,
        updated_at
      )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
  `;
  return db.oneOrNone(sql, [
    user.email,
    user.name,
    user.lastname,
    user.phone,
    user.image,
    user.password,
    new Date(),
    new Date(),
  ]);
};

//Comparar una contraseña enviada con pw encriptado en DB
User.isPwMatched = (uPW, hash) => {
  const pwHashed = crypto.createHash("md5").update(uPW).digest("hex");
  if (pwHashed === hash) {
    return true;
  }
  return false;
};

//objeto para el controlador
module.exports = User;
