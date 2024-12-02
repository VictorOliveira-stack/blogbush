require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize ( process.env.MYSQL_DATABASE,  process.env.MYSQLUSER,
    process.env.MYSQL_ROOT_PASSWORD,  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306 || 3307
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

