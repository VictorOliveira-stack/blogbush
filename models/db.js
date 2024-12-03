/*require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize ( process.env.MYSQL_DATABASE,  process.env.MYSQLUSER,
    process.env.MYSQL_ROOT_PASSWORD,  {
    host: process.env.MYSQLHOST,
    dialect: 'mysql',
    port: process.env.MYSQLPORT || 3307
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
*/
require('dotenv').config();
const Sequelize = require('sequelize');

// Pegue a URL de conexão do MySQL do Railway
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql2',
    protocol: 'mysql2',
    logging: false,  // Desativa os logs SQL, se necessário
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
};
