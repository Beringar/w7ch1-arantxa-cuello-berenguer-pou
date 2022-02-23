require("dotenv").config();
const debug = require("debug")("series:root");
const chalk = require("chalk");
const startServer = require("./server/startServer");
const app = require("./server");
const connectToMongoDB = require("./db");

const port = process.env.PORT || 3000;
const mongoDBconnectionString = process.env.MONGO_DB_ATLAS_STRING;

(async () => {
  try {
    await connectToMongoDB(mongoDBconnectionString);
    await startServer(app, port);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
  }
})();
