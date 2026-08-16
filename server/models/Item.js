import mongoose from 'mongoose';

/**
 * An "Item" is one entry in a list-type collection (portfolio, services,
 * testimonials, gallery, trustedBy, faq, partners). `collection` is the
 * list name, `data` is the item's fields - same schemaless approach as
 * Section, for the same reason: one generic API/dashboard for all lists.
 */
const itemSchema = new mongoose.Schema(
  {
    collection: { type: String, required: true, index: true },
    order: { type: Number, default: 0 },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

itemSchema.index({ collection: 1, order: 1 });

export default mongoose.model('Item', itemSchema);
