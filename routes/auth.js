const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");

router.route("/login").post(userCtrl.login);

module.exports = router;
