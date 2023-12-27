const { moviesMd } = require("./moviesMd");
const moviesCt = {
  getAll: async (req, res) => {
    const movies = await moviesMd.getAll();
    console.log(movies);
    res.send(movies);
  },
  addOne: (req, res) => {
    console.log(req.body);
    console.log(req.files);
  },
};
module.exports = moviesCt;
