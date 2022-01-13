require("dotenv").config();
module.exports = {
  development: {
    client: "pg",
    connection: {
      user: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      charset: "utf8",
    },
  },
  migrations: {
    directory: __dirname + "/knex/migrations",
  },
  seeds: {
    directory: __dirname + "/knex/seeds",
  },
};
