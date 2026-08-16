import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Buffer the upload in memory, then stream it to Cloudinary ourselves -
// avoids depending on multer-storage-cloudinary, which is stuck on the
// Cloudinary v1 SDK and conflicts with the v2 SDK used here.
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB ceiling for raw video uploads
});

export function uploadBufferToCloudinary(buffer, mimetype) {
  const isVideo = mimetype.startsWith('video/');
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'house-of-echoes',
        resource_type: isVideo ? 'video' : 'image',
        transformation: isVideo
          ? [{ width: 1280, crop: 'limit' }]
          : [{ width: 2000, crop: 'limit', quality: 'auto' }],
      },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });
}

export default cloudinary;
