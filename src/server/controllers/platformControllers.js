const Platform = require("../../db/models/Platform");

const getAllPlatforms = async (req, res) => {
  const platforms = await Platform.find();
  res.json({ platforms });
};

const createNewPlatform = async (req, res, next) => {
  try {
    const platform = req.body;
    const newPlatform = await Platform.create(platform);
    res.status(201);
    res.json(newPlatform);
  } catch (error) {
    next(error);
  }
};

const updatePlatform = async (req, res, next) => {
  const { idPlatform } = req.params;
  const platform = req.body;
  try {
    const updatedPlatform = await Platform.findByIdAndUpdate(
      idPlatform,
      platform,
      {
        new: true,
      }
    );

    if (!updatedPlatform) {
      const error = new Error("Update error");
      error.code = 400;
      next(error);
    } else {
      res.status(200);
      res.json(updatedPlatform);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

module.exports = { getAllPlatforms, createNewPlatform, updatePlatform };
