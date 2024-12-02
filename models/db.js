require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize ( process.env.B_banco, /*'blogbushtres',*/ process.env.B_mysqlUser, /*'root',*/
    process.env.B_passMy, /*'victorluiza',*/ {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

