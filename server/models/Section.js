import mongoose from 'mongoose';

/**
 * A "Section" is a singleton piece of content - there is exactly one of
 * each key (hero, intro, about, journey, whyChooseUs, contact, settings).
 * `data` is intentionally schemaless: each section's shape lives in the
 * frontend components that consume it, same as the old content/*.json
 * files did. This is what lets one generic API + one generic dashboard
 * form-renderer serve every section without a model per section.
 */
const sectionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model('Section', sectionSchema);
