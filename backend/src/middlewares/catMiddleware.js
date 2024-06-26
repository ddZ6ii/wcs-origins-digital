const models = require("../models");

const checkForExistingCategory = async (req, res, next) => {
  try {
    const [categories] = await models.category.findAll();

    const match = categories.find(
      (category) => category.name.toLowerCase() === req.body.name.toLowerCase()
    );

    if (match) return res.status(409).send("Category already exists!");

    return next();
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(
        "oops...an error occured when checking for already existing category..."
      );
  }
};

module.exports = checkForExistingCategory;
