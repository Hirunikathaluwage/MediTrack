
import Branch from "../models/Branch.js";
import Order from '../models/Order.js'; // Import the Order model

export const getAllBranches = async (req, res) => {
    try {
        const branches = await Branch.find();
        res.json(branches);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch branches", error: err.message });
    }
};


// Get branch details by branchId
export const getBranchById = async (req, res) => {
  const { branchId } = req.params;

  try {
    const branch = await Branch.findById(branchId);

    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    res.status(200).json(branch);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch branch details', error: error.message });
  }
};

// Get all branches
export const getBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.status(200).json(branches);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch branches', error: error.message });
  }
};

// Get branch by orderId
export const getBranchByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log('Received orderId:', orderId); // Debugging

    // Find the order by orderId
    const order = await Order.findById(orderId);
    console.log('Fetched order:', order); // Debugging

    if (!order || !order.branchId) {
      return res.status(404).json({ message: 'Branch not found for this order' });
    }

    // Fetch the branch details using branchId
    const branch = await Branch.findById(order.branchId);
    console.log('Fetched branch:', branch); // Debugging

    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    // Return the branch details
    res.status(200).json({
      branchName: branch.branchName,
      location: branch.location,
      phoneNumber: branch.phoneNumber,
    });
  } catch (error) {
    console.error('Error in getBranchByOrderId:', error.message); // Debugging
    res.status(500).json({ message: 'Failed to fetch branch', error: error.message });
  }
};
