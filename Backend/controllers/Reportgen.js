/*const Medicine = require('../models/Medicine');
const BranchOrder = require('../models/BranchOrder');
const Stat = require('../models/Stat');
const Profit = require('../models/Profit');

exports.getTopMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find().sort({ sales: -1 }).limit(5);
        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching top medicines', error });
    }
};

exports.getBranchOrders = async (req, res) => {
    try {
        const { branchId } = req.params;  
        const orders = await Order.find({ branchId }); 
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching branch orders", error });
    }
};

exports.getStatistics = async (req, res) => {
    try {
        const stats = await Stat.find();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics', error });
    }
};


exports.getProfits = async (req, res) => {
    try {
        const profits = await Profit.find();
        res.json(profits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profits', error });
    }
}; 

*/
