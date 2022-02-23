const express = require("express");
const {
  createNewPlatform,
  getAllPlatforms,
  updatePlatform,
} = require("../controllers/platformControllers");

const router = express.Router();

router.get("/", getAllPlatforms);
router.post("/", createNewPlatform);
router.post("/:idPlatform", updatePlatform);

module.exports = router;
