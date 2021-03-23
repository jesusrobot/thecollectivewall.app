const Sequelize = require('sequelize');
const db = require('../config/db');
const sequelizePaginate = require('sequelize-paginate');

const Posts = db.define('posts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  postContent: Sequelize.STRING(300),
  postSignature: Sequelize.STRING(75),
  numLetters: Sequelize.INTEGER,
  date: Sequelize.STRING
}); 

module.exports = Posts;