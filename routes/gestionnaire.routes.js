const router = require('express').Router()
const gestionnaire = require("../controllers/gestionnaire.controller.js");

router.post("/create-gestionnaire", gestionnaire.createGestinnaire);
router.get('/get-gestionnaires', gestionnaire.getGestinnaires);
router.get('/get-gestinnaires-names',gestionnaire.getGestinnairesNames)
router.get('/get-archived-gestionnaires', gestionnaire.getArchivedGestinnaires);
router.delete('/:id', gestionnaire.deleteGestionnaire)
router.put('/:id', gestionnaire.updateGestionnaire)


module.exports = router