const userController = require("../controller/userController");

const express = require("express");
const router = express.Router();

router.post("/", userController.create);
router.post("/login", userController.login);

module.exports = router;
