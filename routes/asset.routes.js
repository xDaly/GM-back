const router = require("express").Router();
const asset = require("../controllers/asset.controller.js");
const { checkToken } = require("../middlewares/checkToken.middleware.js");

router.post("/", asset.getAssets);
router.post("/create-asset", [checkToken], asset.createAsset);
router.put("/update-asset/:id", [checkToken], asset.editAsset);
router.delete("/delete-asset/:id",[checkToken], asset.deleteAsset);
router.get("/history-asset/:id", asset.getHistory);
module.exports = router;
