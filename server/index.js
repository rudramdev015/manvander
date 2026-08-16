import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import sectionsRoutes from './routes/sections.routes.js';
import itemsRoutes from './routes/items.routes.js';
import uploadRoutes from './routes/upload.routes.js';

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);
app.use(cors({
  origin(origin, callback) {
    // Allow same-origin/non-browser requests (no Origin header) and anything in the allowlist
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} not allowed`));
  },
}));
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/sections', sectionsRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/upload', uploadRoutes);

// Centralized error handler - Multer/Cloudinary/async route errors land here
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const port = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`API listening on port ${port}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
