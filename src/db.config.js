const mysql = require("mysql2");
require("dotenv").config();

module.exports = () => {
  let pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0,
  });

  const promisePool = pool.promise();

  return promisePool;
};
