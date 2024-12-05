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
/*require('dotenv').config();
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
};*/

require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize( 'mysql://root:DSoJgoxppGUcEoumGPWjjjUXsReKvMhN@junction.proxy.rlwy.net:20106/railway'  || {
    host: process.env.MYSQLHOST,
    dialect: 'mysql',
    username: process.env.MYSQLUSER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    ssl:true,
    dialectOptions: {
        ssl:{
            require: true,
           rejectUnauthorized: false
        }
    },
    pool: {
      max: 5, // Número máximo de conexões
      min: 0,  // Número mínimo de conexões
      acquire: 30000, // Tempo máximo para obter uma conexão
      idle: 30000 // Tempo de inatividade antes de fechar a conexão
  }
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}


/*require('dotenv').config();
const { Sequelize } = require('sequelize'); 

const sequelize = new Sequelize(process.env.DATABASE_URL , {
    dialect: 'mysql',
    protocol: 'mysql',
    ssl: true,  // Railway exige SSL para a conexão
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Ignora erros de certificado SSL
      }
    }
  });*/
  

