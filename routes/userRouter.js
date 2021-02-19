const router = require("express").Router();
const ctrlUser = require("../controllers/userController");
const auth = require("../middleware/auth");
//Register user
router.post("/register", ctrlUser.registerUser);

//Register login
router.post("/login", ctrlUser.loginUser);

//verify token
router.get("/verify", ctrlUser.verifiedToken);

module.exports = router;
