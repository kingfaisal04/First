//import express
const express = require("express");

const router = express.Router();
//import controller
const { register, login } = require("../Controllers/authController");

//register route
router.post("/signup", register);

//login route
router.post("/login", login);

module.exports = router;
