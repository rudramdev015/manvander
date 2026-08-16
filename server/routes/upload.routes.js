import { Router } from 'express';
import { upload, uploadBufferToCloudinary } from '../config/cloudinary.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Protected - dashboard uploads an image or video, gets back a Cloudinary URL
// to store in whatever section/item field it belongs to.
router.post('/', requireAuth, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const result = await uploadBufferToCloudinary(req.file.buffer, req.file.mimetype);
  res.json({ url: result.secure_url, publicId: result.public_id });
});

export default router;
