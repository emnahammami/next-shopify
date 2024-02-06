const express = require('express');
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { addEntry,getAllEntries } from '../controllers/productControllerImage';
const router = express.Router();
router.post('/addentry', addEntry);
router.post('/addentry', getAllEntries);
router.post('/', createProduct);
router.get('/', getProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
