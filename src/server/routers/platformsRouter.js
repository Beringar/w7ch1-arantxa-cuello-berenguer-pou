const express = require("express");
const auth = require("../middlewares/auth");
const {
  createNewPlatform,
  getAllPlatforms,
  updatePlatform,
} = require("../controllers/platformControllers");

const router = express.Router();

router.get("/", auth, getAllPlatforms);
router.post("/", auth, createNewPlatform);
router.put("/:idPlatform", auth, updatePlatform);

module.exports = router;
