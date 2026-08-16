import { Router } from 'express';
import {
  getItems, createItem, updateItem, deleteItem, reorderItems,
} from '../controllers/items.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/:collection', getItems);
router.post('/:collection', requireAuth, createItem);
router.put('/:collection/reorder', requireAuth, reorderItems);
router.put('/:collection/:id', requireAuth, updateItem);
router.delete('/:collection/:id', requireAuth, deleteItem);

export default router;
