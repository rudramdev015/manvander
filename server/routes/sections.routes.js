import { Router } from 'express';
import { getAllSections, getSection, upsertSection } from '../controllers/sections.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllSections);
router.get('/:key', getSection);
router.put('/:key', requireAuth, upsertSection);

export default router;
