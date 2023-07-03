const router = require("express").Router();
const auth = require("../controllers/auth.controller");

router.post("/signin", auth.signin);
module.exports = router;
