import { Router } from 'express';
import { addCategory, getAllCategory } from '../controllers/categoryController';

const router = Router();

router.post('/add', addCategory);
router.get('/getAll', getAllCategory);

export default router;