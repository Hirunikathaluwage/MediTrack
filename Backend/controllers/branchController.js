
import Branch from "../models/Branch.js";

export const getAllBranches = async (req, res) => {
    try {
        const branches = await Branch.find();
        res.json(branches);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch branches", error: err.message });
    }
};

