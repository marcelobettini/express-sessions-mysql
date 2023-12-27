const { moviesMd } = require("../movies/moviesMd.js");
const homeCt = {
  renderIndex: async (req, res) => {
    const data = await moviesMd.getAll();
    const movies = JSON.parse(data);
    res.render("pages/home", {
      movies,
      currentRoute: res.locals.currentRoute,
      user: req.session.user,
    });
  },
};
module.exports = homeCt;
