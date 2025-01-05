// routes/inventoryRoutes.js
import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/products.js';
import { authenticateToken } from '../middlewares/auth.js';

const prductsRouter = express.Router();

prductsRouter.post('/', authenticateToken, createProduct);       
prductsRouter.get('/', getAllProducts);       
prductsRouter.get('/:id', getProductById);    
prductsRouter.put('/:id', authenticateToken, updateProduct);     
prductsRouter.delete('/:id', authenticateToken, deleteProduct);  

export default prductsRouter;
