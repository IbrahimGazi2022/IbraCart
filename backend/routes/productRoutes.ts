import { Router } from 'express';
import { addNewProduct, getAllProduct } from '../controllers/productController';

const router = Router();

router.post('/', addNewProduct);
router.get('/getAllProduct', getAllProduct);

export default router;