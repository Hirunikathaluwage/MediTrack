import express from 'express';
import Inquiry from '../Model/InquiryModel.js';
import * as InquiryControllers from '../Controlers/InquiryControllers.js';

const router = express.Router();

router.get('/', InquiryControllers.getAllInquiries);
router.post('/', InquiryControllers.addInquiry);
router.get('/:id', InquiryControllers.getInquiryById);
router.put('/:id', InquiryControllers.updateInquiry);
router.delete('/:id', InquiryControllers.deleteInquiry);

export default router;