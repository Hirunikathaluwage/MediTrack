import Inquiry from '../Model/InquiryModel.js';

export const getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find();
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inquiries' });
    }
};

export const getInquiryStats = async (req, res) => {
    try {
        const stats = await Inquiry.aggregate([
            // Define your aggregation pipeline here
        ]);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inquiry statistics' });
    }
};
