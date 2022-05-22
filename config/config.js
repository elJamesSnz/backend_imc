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
  host: process.env.host,
  port: process.env.port,
  database: process.env.db,
  user: process.env.dbuser,
  password: process.env.dbpw,
  //remove the no-encryption error
  ssl: {
    rejectUnauthorized: false,
  },
};

const db = pgp(databaseConfig);

//utilizar variable en diferentes archivos
module.exports = db;
