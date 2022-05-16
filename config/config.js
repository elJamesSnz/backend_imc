const promise = require("bluebird");
const options = {
  promiseLib: promise,
  query: (e) => {},
};

const pgp = require("pg-promise")(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function (stringValue) {
  return stringValue;
});

//configuracion db para testing
const databaseConfig = {
  host: "127.0.0.1",
  port: 5432,
  database: "imc_db",
  user: "postgres",
  password: "+-*pwtest+-*",
};

const db = pgp(databaseConfig);

//utilizar variable en diferentes archivos
module.exports = db;
