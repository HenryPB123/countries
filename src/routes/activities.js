const { Router } = require("express");
const {
  allActivities,
  createActivities,
  deleteActivities,
  editActivities,
} = require("./controllers/activityController");

const router = Router();

router.get("/", allActivities);
router.post("/", createActivities);
router.put("/", editActivities);
router.delete("/", deleteActivities);

module.exports = router;
