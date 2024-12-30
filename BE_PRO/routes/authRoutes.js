const express = require("express");
const { registerUser, loginUser,getserver } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getserver);

module.exports = router;
