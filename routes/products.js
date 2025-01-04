// routes/inventoryRoutes.js
import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/products.js';

const prductsRouter = express.Router();

prductsRouter.post('/', createProduct);       
prductsRouter.get('/', getAllProducts);       
prductsRouter.get('/:id', getProductById);    
prductsRouter.put('/:id', updateProduct);     
prductsRouter.delete('/:id', deleteProduct);  

export default prductsRouter;
