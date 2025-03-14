import Inquiry from '../Model/InquiryModel.js';

export const getAllInquiries = async (req, res, next) => {
  let inquiries;
  try {
    inquiries = await Inquiry.find();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error retrieving inquiries' });
  }
  if (!inquiries || inquiries.length === 0) {
    return res.status(404).json({ message: 'No inquiries found' });
  }
  return res.status(200).json({ inquiries });
};

export const addInquiry = async (req, res, next) => {
  const { name, email, subject, description, category, priority, attachment } = req.body;
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
    console.log(err);
    return res.status(500).json({ message: 'Error adding inquiry' });
  }
};

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