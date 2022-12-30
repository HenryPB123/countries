const { Router } = require("express");
const {
  getDataDB,
  getCountryById,
  getCountryWithActivity,
} = require("./controllers/countryController");

const router = Router();

router.get("/", getDataDB);
router.get("/activity", getCountryWithActivity);
router.get("/:id", getCountryById);

module.exports = router;
