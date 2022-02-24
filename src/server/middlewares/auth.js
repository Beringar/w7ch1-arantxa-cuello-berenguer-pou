const jwt = require("jsonwebtoken");
const debug = require("debug")("items:middlewares:auth");
const chalk = require("chalk");
const User = require("../../db/models/User");

const auth = (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    const error = new Error("Token is missing!");
    error.code = 401;
    next(error);
  }
  try {
    const decodedTokenOK = jwt.verify(authorization, process.env.JWT_SECRET);
    req.userId = decodedTokenOK.id;
    debug(
      chalk.greenBright(`Token for user with ID ${decodedTokenOK.id} is valid`)
    );
    next();
  } catch (error) {
    error.code = 401;
    error.message = "Invalid token!";
    next(error);
  }
};

const adminAuth = async (req, res, next) => {
  const { userId } = req;
  debug(userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error(`UserId ${userId} not found!`);
      error.code = 401;
      next(error);
    } else {
      const { isAdmin } = user;
      if (!isAdmin) {
        const error = new Error(
          `User with id ${userId} has no Admin permissions!`
        );
        error.code = 401;
        next(error);
      } else {
        debug(chalk.cyanBright(`Received valid request from Admin ${userId}`));
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { auth, adminAuth };
