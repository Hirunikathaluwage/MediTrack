import express from 'express';
import multer from 'multer';
import * as InquiryControllers from '../controllers/inquiryController.js'; // ✅ All controller functions

const router = express.Router();

// ✅ File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// ✅ Inquiry Routes
router.get('/stats', InquiryControllers.getInquiryStats); // Summary stats
router.get('/analytics', InquiryControllers.getInquiryAnalytics); // 🔶 NEW: Dashboard charts

router.post('/respond/:id', InquiryControllers.respondToInquiry);
router.get('/', InquiryControllers.getAllInquiries);
router.post('/', upload.single('attachment'), InquiryControllers.addInquiry);
router.get('/:id', InquiryControllers.getInquiryById);
router.put('/:id', upload.single('attachment'), InquiryControllers.updateInquiry);
router.delete('/:id', InquiryControllers.deleteInquiry);

export default router;
