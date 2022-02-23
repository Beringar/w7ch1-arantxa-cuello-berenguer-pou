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

const updatePlatform = async (req, res) => {
  const editedPlatform = await Platform.findByIdAndUpdate(
    req.body.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(editedPlatform);
};

module.exports = { getAllPlatforms, createNewPlatform, updatePlatform };
