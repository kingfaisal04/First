const express = require("express");

const {
  retrieveUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../Controllers/usersController");

const router = express.Router();

router.get("/student", retrieveUser);
router.post("/student", createUser);
router.get("/student/:id", getUserById);
router.put("/student/:id", updateUser);
router.delete("/student/:id", deleteUser);

module.exports = router;