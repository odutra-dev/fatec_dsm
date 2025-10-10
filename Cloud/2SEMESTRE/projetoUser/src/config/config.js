// Define a string de conexão com o banco de dados
module.exports = {
  development: {
    database: {
      host: "ls-8b423f1aea54640515cefdf9502d74dda31e239d.cmr0sqm4oc9l.us-east-1.rds.amazonaws.com",
      port: 3306,
      name: "db_usuario",
      dialect: "mysql",
      user: "dbmasteruser",
      password: "!Yf|?~-TZ[I#5F5Hx7hBj67F|x`4~r79",
    },
  },
  production: {
    database: {
      host: process.env.DB_HOST,
      host: process.env.DB_PORT,
    },
  },
};
