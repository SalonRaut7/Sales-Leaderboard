const Sale = require("../models/Sale");

async function getStats() {
  const today = new Date();
  today.setHours(0,0,0,0);

  const total = await Sale.aggregate([
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
        totalSales: { $sum: "$salesCount" }
      }
    }
  ]);

  const todayStats = await Sale.aggregate([
    { $match: { createdAt: { $gte: today } } },
    {
      $group: {
        _id: null,
        todayAmount: { $sum: "$amount" },
        todaySales: { $sum: "$salesCount" }
      }
    }
  ]);

  return {
    totalAmount: total[0]?.totalAmount || 0,
    totalSales: total[0]?.totalSales || 0,
    todayAmount: todayStats[0]?.todayAmount || 0,
    todaySales: todayStats[0]?.todaySales || 0
  };
}

module.exports = { getStats };
