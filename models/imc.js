const db = require("../config/config");

//objeto con métodos
const IMC = {};

IMC.create = (id_user, id_imc, imc_value) => {
  //sentencia SQL a ejecutar
  const sql = `
    INSERT INTO
        user_has_imcs(
            id_user,
            id_imc,
            imc_value,
            created_at,
            updated_At
        )
    VALUES($1, $2, $3, $4, $5)
    `;
  //no se retorna nada. Se establece arreglo con valores
  return db.none(sql, [id_user, id_imc, imc_value, Date(), new Date()]);
};

//se exporta objeto IMC
module.exports = IMC;
