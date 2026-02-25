import { Router } from 'express';
import { addNewProduct } from '../controllers/productController';

const router = Router();

router.post('/', addNewProduct);

export default router;