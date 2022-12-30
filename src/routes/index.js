const { Router } = require("express");
const countryRoute = require("./countries");
const activityRoute = require("./activities");
const continentRoute = require("./continents");
const orderRoute = require("./orderings");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", countryRoute);
router.use("/activities", activityRoute);
router.use("/continents", continentRoute);
router.use("/orderings", orderRoute);

module.exports = router;
