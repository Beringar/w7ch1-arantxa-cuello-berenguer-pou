const express = require("express");
const {
  createNewPlatform,
  getAllPlatforms,
  updatePlatform,
} = require("../controllers/platformControllers");

const router = express.Router();

router.get("/platforms", getAllPlatforms);
router.post("/platforms", createNewPlatform);
router.post("platforms/:idPlatform", updatePlatform);
