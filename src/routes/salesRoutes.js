const express = require("express");
const router = express.Router();
const controller = require("../controllers/salesController");

router.post("/sales", controller.addSale);
router.get("/leaderboard", controller.leaderboard);
router.get("/stats", controller.stats);


module.exports = router;
