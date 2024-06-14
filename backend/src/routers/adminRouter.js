const express = require("express");

const adminController = require("../controllers/adminController");
const verifyToken = require("../middlewares/verifyToken");
const { hasAdminRole } = require("../middlewares/authMiddleware");

const router = express.Router();

// authentication wall : verifyToken is activated for each route after this line
router.use(verifyToken);

router.get("/stats", hasAdminRole, adminController.getAllStats);
router.get("/videos", hasAdminRole, adminController.getAllVideos);

module.exports = router;
