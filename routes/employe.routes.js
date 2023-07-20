const router = require("express").Router();
const employe = require("../controllers/employe.controller.js");
const { checkToken } = require("../middlewares/checkToken.middleware.js");

router.post("/create-employe", [checkToken], employe.createEmploye);
router.post("/", [checkToken], employe.getEmployes);
router.get("/get-employes", [checkToken], employe.getEmployesForAffectation);
router.post("/update-employe/:id", [checkToken], employe.updateEmploye);
router.get("/employe-assets/:id", [checkToken], employe.getEmployeByIdWithAssets);
module.exports = router;
