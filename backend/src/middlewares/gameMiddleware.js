const models = require("../models");

const checkForExistingGame = async (req, res, next) => {
  try {
    const [games] = await models.game.findAll();

    const match = games.find(
      (game) => game.name.toLowerCase() === req.body.name.toLowerCase()
    );

    if (match) return res.status(409).send("Game already exists!");

    return next();
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(
        "oops...an error occured when checking for already existing game..."
      );
  }
};

module.exports = checkForExistingGame;
