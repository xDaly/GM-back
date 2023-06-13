const router = require('express').Router()
const asset = require("../controllers/asset.controller.js");

router.post("/create-asset", asset.createAsset);



module.exports = router