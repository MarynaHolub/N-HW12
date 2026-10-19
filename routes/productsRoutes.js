import { Router } from 'express';
import {
  validateCreateProduct,
  validateUpdateProduct,
} from '../middlewares/validateProduct.js';
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from '../controllers/productsController.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';

const router = Router();

router.post('/', validateCreateProduct, createProduct);

router.get('/', getProducts);

router.get('/:id', validateObjectId, getProductById);

router.put('/:id', validateObjectId, validateUpdateProduct, updateProductById);

router.delete('/:id', validateObjectId, deleteProductById);

export default router;
