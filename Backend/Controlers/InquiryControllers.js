import Inquiry from '../Model/InquiryModel.js';

// Get all inquiries
export const getAllInquiries = async (req, res, next) => {
    let Inquiries;
    try {
        Inquiries = await Inquiry.find();
    } catch (err) {
        console.error("Error retrieving inquiries:", err); 
        return res.status(500).json({ message: 'Error retrieving inquiries' });
    }
    if (!Inquiries || Inquiries.length === 0) {
        return res.status(404).json({ message: 'No Inquiries found' });
    }
    return res.status(200).json({ Inquiries });
};

// Add a new inquiry
export const addInquiry = async (req, res, next) => {
    const { name, email, subject, description, category, priority } = req.body;
    const attachment = req.file ? `/uploads/${req.file.filename}` : null; // Ensure correct file path
    let inquiries;
    try {
        inquiries = new Inquiry({
            name,
            email,
            subject,
            description,
            category,
            priority,
            attachment
        });
        await inquiries.save();
        return res.status(201).json({ message: 'Inquiry added successfully', inquiries });
    } catch (err) {
        console.error("Error adding inquiry:", err.stack); // Add detailed logging
        return res.status(500).json({ message: 'Error adding inquiry' });
    }
};

// Get inquiry by ID
export const getInquiryById = async (req, res, next) => {
    const inquiryId = req.params.id;
    let inquiry;
    try {
        inquiry = await Inquiry.findById(inquiryId);
    } catch (err) {
        console.log(err);
    }
    if (!inquiry) {
        return res.status(404).json({ message: 'Inquiry not found' });
    }
    return res.status(200).json({ inquiry });
};

// Update an inquiry
export const updateInquiry = async (req, res, next) => {
    const inquiryId = req.params.id;
    const { name, email, subject, description, category, priority, attachment } = req.body;
    let inquiry;
    try {
        inquiry = await Inquiry.findByIdAndUpdate(inquiryId, 
            { name, email, subject, description, category, priority, attachment });
        await inquiry.save();
    } catch (err) {
        console.log(err);
    }
    if (!inquiry) {
        return res.status(404).json({ message: 'Unable to update inquiry' });
    }
    return res.status(200).json({ inquiry });
};

// Delete an inquiry
export const deleteInquiry = async (req, res, next) => {
    const inquiryId = req.params.id;
    let Dinquiry;
    try {
        Dinquiry = await Inquiry.findByIdAndDelete(inquiryId);
    } catch (err) {
        console.log(err);
    }
    if (!Dinquiry) {
        return res.status(404).json({ message: 'Unable to delete inquiry' });
    }
    return res.status(200).json({ Dinquiry });
};

// Get inquiry statistics
export const getInquiryStats = async (req, res, next) => {
    try {
        const stats = await Inquiry.aggregate([
            {
                $group: {
                    _id: null,
                    totalInquiries: { $sum: 1 },
                    pendingInquiries: { $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] } },
                    resolvedInquiries: { $sum: { $cond: [{ $eq: ["$status", "Resolved"] }, 1, 0] } },
                    criticalInquiries: { $sum: { $cond: [{ $eq: ["$priority", "High"] }, 1, 0] } }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalInquiries: 1,
                    pendingInquiries: 1,
                    resolvedInquiries: 1,
                    criticalInquiries: 1
                }
            }
        ]);
        console.log('Stats:', stats); 
        res.status(200).json(stats[0]);
    } catch (error) {
        console.error('Error fetching inquiry statistics:', error); 
        res.status(500).json({ message: 'Error fetching inquiry statistics' });
    }
};