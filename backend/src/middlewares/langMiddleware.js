const models = require("../models");

const checkForExistingLanguage = async (req, res, next) => {
  try {
    const [languages] = await models.language.findAll();

    const match = languages.find(
      (language) => language.name.toLowerCase() === req.body.name.toLowerCase()
    );

    if (match) return res.status(409).send("Language already exists!");

    return next();
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(
        "oops...an error occured when checking for already existing language..."
      );
  }
};

module.exports = checkForExistingLanguage;
