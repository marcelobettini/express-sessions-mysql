const path = require("node:path");
const file = require("../../utils/file.js");
//

const moviesMd = {
  async getAll() {
    const movies = await file.read(path.resolve(__dirname, "./movies.json"));
    return movies;
  },
  getById(id) {
    return `get movie ${id}`;
  },
  addOne(newMovie) {
    return `add movie: ${newUser}`;
  },
  updateOne(id, data) {
    return `update movie ${id} with new data: \n ${data}`;
  },
  deleteOne(id) {
    return `delete movie ${id}`;
  },
};
module.exports = { moviesMd };
