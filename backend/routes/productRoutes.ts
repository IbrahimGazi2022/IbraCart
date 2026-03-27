import { Router } from 'express';
import { addNewProduct, getAllProduct, toggleFeatured } from '../controllers/productController';

const router = Router();

router.post('/', addNewProduct);
router.get('/getAllProduct', getAllProduct);
router.patch('/:id/toggle-featured', toggleFeatured);

export default router;