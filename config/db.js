const Sequelize = require('sequelize');
// Extraer valores de las variables de entorno
require('dotenv').config({path: 'vars.env'});

const db = new Sequelize(process.env.DB_NAME , process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT,
  operatorAliases: false,
  define: {
    timestamps: false
  },
  pool: {
    max: 5, 
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;