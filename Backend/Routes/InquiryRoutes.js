import express from 'express';
import multer from 'multer';
import * as InquiryControllers from '../Controlers/InquiryControllers.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.get('/stats', InquiryControllers.getInquiryStats); // Place this route before the dynamic route

router.get('/', InquiryControllers.getAllInquiries);

router.post('/', upload.single('attachment'), InquiryControllers.addInquiry);

router.get('/search', InquiryControllers.searchInquiries); // Add this line

router.get('/:id', InquiryControllers.getInquiryById);

router.put('/:id', upload.single('attachment'), InquiryControllers.updateInquiry);

router.delete('/:id', InquiryControllers.deleteInquiry);

export default router;
