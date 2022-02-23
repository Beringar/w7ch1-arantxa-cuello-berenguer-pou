const Platform = require("../../db/models/Platform");

const getAllPlatforms = async (req, res) => {
  const platforms = await Platform.find();
  res.json({ platforms });
};

const createNewPlatform = async (req, res, next) => {
  try {
    const platform = req.body;
    const newPlatform = await Platform.create(platform);
    res.status(201).json(newPlatform);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPlatforms, createNewPlatform };
