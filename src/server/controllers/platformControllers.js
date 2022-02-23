const Platform = require("../../db/models/Platform");

const getAllPlatforms = async (req, res) => {
  const platforms = await Platform.find();
  res.json({ platforms });
};

module.exports = getAllPlatforms;
