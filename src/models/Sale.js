const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  agentName: { type: String, required: true },
  amount: { type: Number, required: true },
  salesCount: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sale", saleSchema);
