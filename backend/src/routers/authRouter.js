const express = require("express");
const validateCredentials = require("../middlewares/validators/credentialsValidator");

const authController = require("../controllers/authController");
const {
  verifyEmail,
  verifyPassword,
} = require("../middlewares/authMiddleware");

const router = express.Router();
router.post(
  "/login",
  validateCredentials,
  verifyEmail,
  verifyPassword,
  authController.login
);

router.get("/logout", authController.logout);

module.exports = router;
