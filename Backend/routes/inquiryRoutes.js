// backend/routes/inquiryRoutes.js
import express from 'express';
import multer from 'multer';
import * as InquiryControllers from '../controllers/inquiryController.js'; // ✅ Corrected casing

const router = express.Router();

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Routes
router.get('/stats', InquiryControllers.getInquiryStats);
router.post('/respond/:id', InquiryControllers.respondToInquiry);
router.get('/', InquiryControllers.getAllInquiries);
router.post('/', upload.single('attachment'), InquiryControllers.addInquiry);
router.get('/:id', InquiryControllers.getInquiryById);
router.put('/:id', upload.single('attachment'), InquiryControllers.updateInquiry);
router.delete('/:id', InquiryControllers.deleteInquiry);

export default router;
