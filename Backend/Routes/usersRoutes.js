// importing express
const express = require("express");

//importing controllers
const {retrieveUser,createUser,getUserById,updateUser,deleteUser,} = require("../Controllers/usersController");
const { findById } = require("../model/student");

const router = express.Router();
// // routes
router.get("/student", retrieveUser);
router.post("/student", createUser);
router.get("/student/:id", getUserById);
router.put("/student/:id", updateUser);
router.delete("/student/:id", deleteUser);

module.exports = router;
