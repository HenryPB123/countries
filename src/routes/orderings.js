const { Router } = require("express");
const { orderings } = require("./controllers/orderingsController");

const router = Router();

router.get("/", orderings);

module.exports = router;
