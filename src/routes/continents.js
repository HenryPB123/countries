const { Router } = require("express");
const { countriesByContinents } = require("./controllers/continentController");

const router = Router();

router.get("/", countriesByContinents);

module.exports = router;
