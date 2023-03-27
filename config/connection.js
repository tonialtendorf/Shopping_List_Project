//Import sequelize
const Sequelize = require("sequelize");
// Import and load .env
require("dotenv").config();

//Declare sequelize variable
let sequelize;

// Creates sequelize instance in that URL. If not, will create sequelize instance using db_name, db_user, and db_password
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "127.0.0.1",
      dialect: "mysql",
      port: 3306,
    }
  );
}
//Export sequelize
module.exports = sequelize;
