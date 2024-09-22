const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mvp_case_development', 'postgres', process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'postgres'
  });

module.exports = {
    sequelize
}
