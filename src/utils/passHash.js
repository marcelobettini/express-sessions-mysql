const bcrypt = require("bcrypt");
const saltRounds = 10;

const passHash = {
  encrypt: async passwordPlain => {
    return await bcrypt.hash(passwordPlain, saltRounds);
  },
  decrypt: async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
  },
};

module.exports = { passHash };
