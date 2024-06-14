const express = require("express");

const userController = require("../controllers/userController");
const validateUserInfo = require("../middlewares/validators/userValidator");
const verifyToken = require("../middlewares/verifyToken");
const {
  verifyEmail,
  checkForExistingAccount,
  hashPassword,
  hasAdminRole,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/stats/:id", userController.getAllStats);

router.post(
  "/",
  validateUserInfo,
  checkForExistingAccount,
  hashPassword,
  userController.create
);

// authentication wall : verifyToken is activated for each route after this line
router.use(verifyToken);

router.get("/", userController.getAll);
router.get("/:id", userController.getById);

router.put(
  "/:id",
  hasAdminRole,
  validateUserInfo,
  verifyEmail,
  hashPassword,
  userController.editById
);

router.delete("/:id", hasAdminRole, userController.remove);

module.exports = router;
