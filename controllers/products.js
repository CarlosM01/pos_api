// controllers/inventoryController.js
import Product from '../models/product.js';

// Create a product
export const createProduct = async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;
    const product = await Product.create({ name, price, quantity, description });
    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error getting products' });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error getting product' });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity, description } = req.body;
    const product = await Product.findByPk(id);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.update({ name, price, quantity, description });
    res.json({ message: 'Product updated', product });
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.destroy();
    res.json({ message: 'Producto deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};
