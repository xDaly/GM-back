const router = require('express').Router()
const gestionnaire = require("../controllers/gestionnaire.controller.js");

router.post("/create-gestionnaire", gestionnaire.createGestinnaire);
router.get('/get-gestionnaires',gestionnaire.getGestinnaires);
router.delete('/:id',gestionnaire.deleteGestionnaire)


module.exports = router