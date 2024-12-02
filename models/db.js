require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize ( process.env.B_banco,  process.env.B_mysqlUser,
    process.env.B_passMy,  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306 || 3307
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

