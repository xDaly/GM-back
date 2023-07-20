const router = require("express").Router();
const data = require("../controllers/data.controller.js");

router.get("/structures", data.getStructures);
router.get("/localisations", data.getLocalisations);
router.get("/types", data.getTypes);
router.get("/counts", data.getCounts);


module.exports = router;
