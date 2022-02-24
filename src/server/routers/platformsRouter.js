const express = require("express");
const { auth, adminAuth } = require("../middlewares/auth");
const {
  createNewPlatform,
  getAllPlatforms,
  updatePlatform,
} = require("../controllers/platformControllers");

const router = express.Router();

router.get("/", auth, getAllPlatforms);
router.post("/", auth, adminAuth, createNewPlatform);
router.put("/:idPlatform", auth, adminAuth, updatePlatform);

module.exports = router;
