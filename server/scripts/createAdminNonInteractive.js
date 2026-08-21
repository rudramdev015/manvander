import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';

const [, , email, password] = process.argv;

if (!email || !password || password.length < 8) {
  console.error('Usage: node createAdminNonInteractive.js <email> <password (min 8 chars)>');
  process.exit(1);
}

await connectDB();
const passwordHash = await bcrypt.hash(password, 12);
await Admin.findOneAndUpdate(
  { email: email.toLowerCase() },
  { email: email.toLowerCase(), passwordHash },
  { upsert: true }
);
console.log(`Admin account ready: ${email}`);
await mongoose.disconnect();
