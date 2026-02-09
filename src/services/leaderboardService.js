const Sale = require("../models/Sale");

async function getLeaderboard() {
  const data = await Sale.aggregate([
    {
      $group: {
        _id: "$agentName",
        totalAmount: { $sum: "$amount" },
        totalSales: { $sum: "$salesCount" }
      }
    },
    { $sort: { totalAmount: -1 } }
  ]);

  // Competition Ranking (1,2,2,4)
  let rank = 1;
  let prevAmount = null;

  return data.map((agent, index) => {
    if (prevAmount !== null && agent.totalAmount < prevAmount) {
      rank = index + 1;
    }
    prevAmount = agent.totalAmount;

    return {
      rank,
      agentName: agent._id,
      totalAmount: agent.totalAmount,
      totalSales: agent.totalSales
    };
  });
}

module.exports = { getLeaderboard };
