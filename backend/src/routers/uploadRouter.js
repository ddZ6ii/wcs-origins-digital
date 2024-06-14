const express = require("express");
const multer = require("multer");

const uploadController = require("../controllers/uploadController");
const validateThumbnailInfo = require("../middlewares/validators/thumbnailValidator");
const validateVideoFileInfo = require("../middlewares/validators/videoFileValidator");
const verifyToken = require("../middlewares/verifyToken");
const { hasAdminRole } = require("../middlewares/authMiddleware");

const router = express.Router();

// public folder destination for games thumbnails upload
const THUMB_DEST = "./public/uploads/thumbnails";
const VIDEO_DEST = "./public/uploads/videos/";
const uploadGameThumbnail = multer({ dest: `${THUMB_DEST}/games/` });
const uploadVideoThumbnail = multer({ dest: `${THUMB_DEST}/videos/` });
const uploadVideo = multer({ dest: VIDEO_DEST });

// authentication wall : verifyToken is activated for each route after this line
router.use(verifyToken);

router.post(
  "/thumbnails/games",
  uploadGameThumbnail.single("game_thumbnail"),
  hasAdminRole,
  validateThumbnailInfo,
  uploadController.post
);

router.delete("/thumbnails/games", hasAdminRole, uploadController.remove);

router.post(
  "/thumbnails/videos",
  uploadVideoThumbnail.single("video_thumbnail"),
  hasAdminRole,
  validateThumbnailInfo,
  uploadController.post
);

router.delete("/thumbnails/videos", hasAdminRole, uploadController.remove);

router.post(
  "/videos",
  uploadVideo.single("video"),
  hasAdminRole,
  validateVideoFileInfo,
  uploadController.post
);

router.delete("/videos", hasAdminRole, uploadController.remove);

module.exports = router;
