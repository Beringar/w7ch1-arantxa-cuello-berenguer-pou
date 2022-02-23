const express = require("express");
const getAllPlatforms = require("../controllers/platformControllers");

const router = express.Router();

router.get("/platforms", getAllPlatforms);
