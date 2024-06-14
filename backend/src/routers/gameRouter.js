const express = require("express");

const gameController = require("../controllers/gameController");
const verifyToken = require("../middlewares/verifyToken");
const checkForExistingGame = require("../middlewares/gameMiddleware");
const validateGameInfo = require("../middlewares/validators/gameValidator");
const { hasAdminRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", gameController.getAll);

// authentication wall : verifyToken is activated for each route after this line
router.use(verifyToken);

router.put("/:id", hasAdminRole, validateGameInfo, gameController.editById);
router.delete("/:id", hasAdminRole, gameController.remove);
router.post(
  "/",
  hasAdminRole,
  validateGameInfo,
  checkForExistingGame,
  gameController.post
);

module.exports = router;
