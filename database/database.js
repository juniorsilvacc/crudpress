const Sequelize = require('sequelize');
const connection = new Sequelize('crudpress', 'root', 'coremas32', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;