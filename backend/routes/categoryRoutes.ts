import { Router } from 'express';
import { addCategory, getAllCategory } from '../controllers/categoryController';

const router = Router();

router.post('/addCategory', addCategory);
router.get('/getAllCategory', getAllCategory);

export default router;