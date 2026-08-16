import 'dotenv/config';
import readline from 'readline';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';

const CTRL_C = '\x03';
const BACKSPACE = '\x7f';

function ask(question, { hidden = false } = {}) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    if (!hidden) {
      rl.question(question, (answer) => { rl.close(); resolve(answer); });
      return;
    }
    // Minimal hidden-input prompt for the password
    const stdin = process.stdin;
    process.stdout.write(question);
    let input = '';
    stdin.setRawMode(true);
    stdin.resume();
    stdin.on('data', function onData(char) {
      char = char.toString();
      if (char === '\n' || char === '\r') {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.removeListener('data', onData);
        process.stdout.write('\n');
        rl.close();
        resolve(input);
      } else if (char === CTRL_C) {
        process.exit(1);
      } else if (char === BACKSPACE) {
        input = input.slice(0, -1);
      } else {
        input += char;
      }
    });
  });
}

async function run() {
  await connectDB();

  const email = (await ask('Admin email: ')).trim().toLowerCase();
  const password = await ask('Admin password: ', { hidden: true });

  if (!email || password.length < 8) {
    console.error('Email is required and password must be at least 8 characters.');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.findOneAndUpdate(
    { email },
    { email, passwordHash },
    { upsert: true }
  );

  console.log(`Admin account ready: ${email}`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
