const express = require("express");
const {
  createNewPlatform,
  getAllPlatforms,
} = require("../controllers/platformControllers");

const router = express.Router();

router.get("/platforms", getAllPlatforms);
router.post("/platforms", createNewPlatform);
