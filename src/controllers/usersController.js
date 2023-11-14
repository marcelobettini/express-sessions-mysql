const UsersMd = require("../models/users.js");
const usersController = {
  getAllUsers: async (req, res) => {
    const users = await UsersMd.getAllUsers();
    console.log("users", users);
    res.end();
  },
};
module.exports = usersController;
