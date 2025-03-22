import express from 'express';
import multer from 'multer'; // Add this line
import * as InquiryControllers from '../Controlers/InquiryControllers.js'; // Fix the directory name
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
<<<<<<< Updated upstream

router.post('/', upload.single('attachment'), InquiryControllers.addInquiry);

=======
router.post('/', upload.single('attachment'), InquiryControllers.addInquiry); // Add upload middleware
>>>>>>> Stashed changes
router.get('/:id', InquiryControllers.getInquiryById);
router.delete('/:id', InquiryControllers.deleteInquiry);

export default router;