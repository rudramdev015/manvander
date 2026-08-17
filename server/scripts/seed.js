import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from '../config/db.js';
import Section from '../models/Section.js';
import Item from '../models/Item.js';
import mongoose from 'mongoose';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(__dirname, '../../content');

function readJSON(relPath) {
  const full = path.join(CONTENT_DIR, relPath);
  if (!fs.existsSync(full)) return null;
  return JSON.parse(fs.readFileSync(full, 'utf-8'));
}

function readFolderJSONFiles(folder, { excludeDataJson = true } = {}) {
  const dir = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json') && !(excludeDataJson && f === '_data.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')));
}

async function upsertSection(key, data) {
  if (!data) return;
  await Section.findOneAndUpdate({ key }, { key, data }, { upsert: true });
  console.log(`  section: ${key}`);
}

async function seedItems(collection, items) {
  if (!items?.length) return;
  await Item.deleteMany({ collection });
  await Item.insertMany(
    items.map((data, index) => ({
      collection,
      order: data.order ?? index,
      data,
    }))
  );
  console.log(`  items: ${collection} (${items.length})`);
}

async function run() {
  await connectDB();
  console.log('Seeding sections...');

  await upsertSection('settings', readJSON('settings/general.json'));
  await upsertSection('social', readJSON('settings/social.json'));

  await upsertSection('hero', readJSON('hero/hero.json'));
  await upsertSection('intro', readJSON('intro/intro.json'));
  await upsertSection('about', readJSON('about/about.json'));
  await upsertSection('journey', readJSON('journey/journey.json'));
  await upsertSection('whyChooseUs', readJSON('why-choose-us/why-choose-us.json'));
  await upsertSection('contact', readJSON('contact/contact.json'));

  const trustedBy = readJSON('trusted-by/_data.json');
  await upsertSection('trustedBy', { title: trustedBy?.title || 'Trusted By' });

  console.log('Seeding item collections...');

  await seedItems('services', readFolderJSONFiles('services'));
  await seedItems('partners', readFolderJSONFiles('partners'));
  await seedItems('gallery', readFolderJSONFiles('gallery'));

  const portfolio = readJSON('portfolio/_data.json');
  await seedItems('portfolio', portfolio?.items || []);

  const testimonials = readJSON('testimonials/_data.json');
  await seedItems('testimonials', testimonials?.items || []);

  const faq = readJSON('faq/_data.json');
  await seedItems('faq', faq?.items || []);

  await seedItems('trustedBy', trustedBy?.items || []);

  const instagram = readJSON('instagram/_data.json');
  await seedItems('instagram', instagram?.items || []);

  console.log('Done.');
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
