// controllers/inventoryController.js
import Product from '../models/product.js';

// Crear un producto
export const createProduct = async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;
    const product = await Product.create({ name, price, quantity, description });
    res.status(201).json({ message: 'Producto creado', product });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity, description } = req.body;
    const product = await Product.findByPk(id);

    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    await product.update({ name, price, quantity, description });
    res.json({ message: 'Producto actualizado', product });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    await product.destroy();
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
