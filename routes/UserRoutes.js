let express = require("express");
let router = express.Router();
let userController = require("../controller/UserController");


router.post("/add", userController.createUser);
router.post("/login", userController.login);

module.exports = router;
