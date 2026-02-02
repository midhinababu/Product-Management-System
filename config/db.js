const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "appuser",
  password: "App@1234",
  database: "product_db",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("MySQL connected");
  }
});

module.exports = db;
