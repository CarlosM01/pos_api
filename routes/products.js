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

prductsRouter.post('/', createProduct);        // Crear producto
prductsRouter.get('/', getAllProducts);        // Listar todos los productos
prductsRouter.get('/:id', getProductById);    // Obtener producto por ID
prductsRouter.put('/:id', updateProduct);     // Actualizar producto
prductsRouter.delete('/:id', deleteProduct);  // Eliminar producto

export default prductsRouter;
