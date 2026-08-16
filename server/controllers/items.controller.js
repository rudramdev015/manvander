import Item from '../models/Item.js';

// Public - all items in a collection, sorted for display, flattened to
// match the old content/*.json shape: { id, order, ...data }
export async function getItems(req, res) {
  const items = await Item.find({ collection: req.params.collection }).sort({ order: 1 });
  res.json(items.map(flatten));
}

// Protected
export async function createItem(req, res) {
  const { collection } = req.params;
  const { id, order, ...data } = req.body; // eslint-disable-line no-unused-vars
  const item = await Item.create({ collection, order: order ?? 0, data });
  res.status(201).json(flatten(item));
}

// Protected
export async function updateItem(req, res) {
  const { id, order, ...data } = req.body; // eslint-disable-line no-unused-vars
  const item = await Item.findByIdAndUpdate(
    req.params.id,
    { ...(order !== undefined && { order }), data },
    { new: true }
  );
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(flatten(item));
}

// Protected
export async function deleteItem(req, res) {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.status(204).end();
}

// Protected - persist a full reordered list in one call (drag-and-drop reorder)
export async function reorderItems(req, res) {
  const { ids } = req.body; // array of item ids in the new order
  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: 'ids must be an array' });
  }
  await Promise.all(ids.map((id, index) => Item.findByIdAndUpdate(id, { order: index })));
  res.status(204).end();
}

function flatten(item) {
  // Spread `data` first so the real id/order always win, even if a stray
  // `id`/`order` key ever ends up inside the stored data blob.
  return { ...item.data, id: item._id.toString(), order: item.order };
}
