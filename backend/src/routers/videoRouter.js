const express = require("express");

const verifyToken = require("../middlewares/verifyToken");
const videoController = require("../controllers/videoController");
const validateVideoInfo = require("../middlewares/validators/videoValidator");
const { hasAdminRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", videoController.getAllWithFilters);
router.get("/premium", videoController.getAllPremium);
router.get("/freemium", videoController.getAllFreemium);
router.get("/:id", videoController.getById);

// authentication wall : verifyToken is activated for each route after this line
router.use(verifyToken);

router.get("/languages/:id", hasAdminRole, videoController.getAllByLanguage);
router.get("/games/:id", hasAdminRole, videoController.getAllByGame);
router.put("/:id", hasAdminRole, validateVideoInfo, videoController.editById);
router.delete("/:id", hasAdminRole, videoController.remove);
router.post("/", hasAdminRole, validateVideoInfo, videoController.post);

module.exports = router;
