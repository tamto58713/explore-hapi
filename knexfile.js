require('dotenv').config({ path: './.env'});

module.exports =  {
  client: 'mssql',
  config: {
    encrypt: true
  },
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_ADMIN,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    encrypt: true
  }
};
