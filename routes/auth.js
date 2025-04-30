const express = require("express");
const router = express.Router();

const { login, register, getUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/user", authMiddleware, getUser);

module.exports = router;