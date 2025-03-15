import Inquiry from '../Model/InquiryModel.js';

// Function to get all inquiries
export const getAllInquiries = async (req, res, next) => {
    let Inquiries;
    const { status } = req.query;

    try {
        if (status) {
            Inquiries = await Inquiry.find({ status });
        } else {
            Inquiries = await Inquiry.find();
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error retrieving inquiries' });
    }

    // Not found check
    if (!Inquiries || Inquiries.length === 0) {
        return res.status(404).json({ message: 'No Inquiries found' });
    }

    // Display all inquiries
    return res.status(200).json({ Inquiries });
};

// Function to insert data
export const addInquiry = async (req, res, next) => {
    const { name, email, subject, description, category, priority } = req.body;
    let attachment = '';

    if (req.file) {
        attachment = req.file.path;
    }

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

        await inquiries.save(); // Save data to the database

        return res.status(201).json({ message: 'Inquiry added successfully', inquiries });
    } catch (err) {
        console.log('Error adding inquiry:', err); // Add this line
        return res.status(500).json({ message: 'Error adding inquiry' });
    }
};

// Function to get inquiry by ID
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

// Function to update inquiry
export const updateInquiry = async (req, res, next) => {
    const inquiryId = req.params.id;
    const { name, email, subject, description, category, priority } = req.body;
    let attachment = '';

    if (req.file) {
        attachment = req.file.path;
    }

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

// Function to delete inquiry
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

// Function to get inquiry statistics
export const getInquiryStats = async (req, res, next) => {
    try {
        const totalInquiries = await Inquiry.countDocuments();
        const pendingInquiries = await Inquiry.countDocuments({ status: 'Pending' });
        const resolvedInquiries = await Inquiry.countDocuments({ status: 'Resolved' });

        return res.status(200).json({
            totalInquiries,
            pendingInquiries,
            resolvedInquiries
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error retrieving inquiry statistics' });
    }
};