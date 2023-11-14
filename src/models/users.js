const pool = require("../users_db.js");

class UsersMd {
  static async getAllUsers() {
    const [rows, fields] = await pool.query(`SELECT * FROM users`);
    console.log("rows:", rows);
    console.log("fields:", fields);
  }
}

module.exports = UsersMd;
