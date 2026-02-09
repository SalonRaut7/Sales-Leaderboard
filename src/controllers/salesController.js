const Sale = require("../models/Sale");
const { getLeaderboard } = require("../services/leaderboardService");
const { getStats } = require("../services/statsService");

// Add sales record
exports.addSale = async (req, res) => {
  try {
    const sale = await Sale.create(req.body);
    res.status(201).json(sale);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get leaderboard
exports.leaderboard = async (req, res) => {
  const data = await getLeaderboard();
  res.json(data);
};

exports.stats = async (req, res) => {
  const stats = await getStats();
  res.json(stats);
};
