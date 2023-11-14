const usersController = require("../controllers/usersController");

const router = require("express").Router();
router.get("/", usersController.getAllUsers);
module.exports = router;
