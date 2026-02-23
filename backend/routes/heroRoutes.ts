import { Router } from 'express';
import { getHeroBanners, saveHeroBanners } from '../controllers/heroController';

const router = Router();

router.get('/', getHeroBanners);
router.post('/', saveHeroBanners);

export default router;