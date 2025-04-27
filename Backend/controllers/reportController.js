import User from '../models/User.js';
import Order from '../models/Order.js';
import Medicine from '../models/Medicine.js';
import Branch from '../models/Branch.js';

const getRegistrations = async (req, res) => {
  try {
    const users = await User.find();

    const monthlyCounts = Array(12).fill(0);

    users.forEach(user => {
      const month = new Date(user.createdAt).getMonth();
      monthlyCounts[month]++;
    });

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    res.json({
      months: months.slice(0, 5), // First 5 months only
      registrations: monthlyCounts.slice(0, 5),
      totalUsers: users.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProfitReport = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: "$branchId",
          totalRevenue: { $sum: "$totalAmount" },
          orderCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'branches',
          localField: '_id',
          foreignField: '_id',
          as: 'branchDetails'
        }
      },
      { $unwind: "$branchDetails" },
      {
        $project: {
          branch: "$branchDetails.branchName",
          revenue: "$totalRevenue",
          cost: { $multiply: ["$totalRevenue", 0.6] }, // Assume 60% cost
          profit: { $subtract: ["$totalRevenue", { $multiply: ["$totalRevenue", 0.6] }] }
        }
      }
    ]);

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTopMedicines = async (req, res) => {
  try {
    const topMedicines = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.medicineId",
          totalSold: { $sum: "$items.quantity" }
        }
      },
      {
        $lookup: {
          from: 'medicines',
          localField: '_id',
          foreignField: '_id',
          as: 'medicineDetails'
        }
      },
      { $unwind: "$medicineDetails" },
      {
        $project: {
          name: "$medicineDetails.name",
          totalSold: 1
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    const labels = topMedicines.map(med => med.name);
    const sales = topMedicines.map(med => med.totalSold);

    res.json({ labels, sales });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBranchOrders = async (req, res) => {
  try {
    const branchOrders = await Order.aggregate([
      {
        $group: {
          _id: "$branchId",
          orders: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'branches',
          localField: '_id',
          foreignField: '_id',
          as: 'branchDetails'
        }
      },
      { $unwind: "$branchDetails" },
      {
        $project: {
          branchName: "$branchDetails.branchName",
          orders: 1
        }
      }
    ]);

    const labels = branchOrders.map(branch => branch.branchName);
    const orders = branchOrders.map(branch => branch.orders);

    res.json({ labels, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  getRegistrations,
  getProfitReport,
  getTopMedicines,
  getBranchOrders,
};
