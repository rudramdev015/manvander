import Section from '../models/Section.js';

// Public - fetch every section at once, shaped like the old CMSContext
// `content` object: { hero: {...}, about: {...}, ... }
export async function getAllSections(req, res) {
  const sections = await Section.find();
  const map = {};
  sections.forEach((s) => { map[s.key] = s.data; });
  res.json(map);
}

// Public - single section
export async function getSection(req, res) {
  const section = await Section.findOne({ key: req.params.key });
  res.json(section?.data || {});
}

// Protected - create or update (sections always exist as a single doc per key)
export async function upsertSection(req, res) {
  const { key } = req.params;
  const section = await Section.findOneAndUpdate(
    { key },
    { key, data: req.body },
    { new: true, upsert: true }
  );
  res.json(section.data);
}
