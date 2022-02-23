const debug = require("debug")("robots:userControllers");
const chalk = require("chalk");

const userRegister = async (req, res, next) => {
  debug(chalk.redBright(req, res, next));
};

module.exports = {
  userRegister,
};
