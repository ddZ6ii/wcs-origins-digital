const express = require("express");

const categoryController = require("../controllers/categoryController");
const verifyToken = require("../middlewares/verifyToken");
const checkForExistingCategory = require("../middlewares/catMiddleware");
const validateCategoryInfo = require("../middlewares/validators/categoryValidator");
const { hasAdminRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", categoryController.getAll);

// authentication wall : verifyToken is activated for each route after this line
router.use(verifyToken);

router.put(
  "/:id",
  hasAdminRole,
  validateCategoryInfo,
  categoryController.editById
);
router.delete("/:id", hasAdminRole, categoryController.remove);
router.post(
  "/",
  hasAdminRole,
  validateCategoryInfo,
  checkForExistingCategory,
  categoryController.post
);

module.exports = router;
