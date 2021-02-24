const Sequelize = require('sequelize');
const connection = new Sequelize('crud', 'root', 'coremas32', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;