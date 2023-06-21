const router = require("express").Router();
const asset = require("../controllers/asset.controller.js");

router.post("/", asset.getAssets);
router.post("/create-asset", asset.createAsset);
router.put("/update-asset/:id", asset.createAsset);
router.delete("/delete-asset/:id",asset.deleteAsset)
module.exports = router;
