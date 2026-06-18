const Product = require('../models/product.model');
const supabase = require('../supabase');
const { productSchema } = require('../dtos/product.dto');

// GET /api/products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Helper to upload Base64 image to Supabase storage
const uploadImageIfNeeded = async (product) => {
  if (product.image && product.image.startsWith('data:image')) {
    const base64Data = product.image.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    const fileName = `${product.id}-${Date.now()}.png`;
    const { data, error } = await supabase.storage
      .from('media')
      .upload(fileName, buffer, { contentType: 'image/png', upsert: false });
    if (error) throw error;
    product.image = data?.publicURL;
  }
  return product;
};

// POST /api/products
const createProduct = async (req, res) => {
  const { error, value } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details });
  try {
    const withImage = await uploadImageIfNeeded(value);
    const product = await Product.create(withImage);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  const { error, value } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details });
  try {
    const withImage = await uploadImageIfNeeded(value);
    const product = await Product.findOneAndUpdate({ id: req.params.id }, withImage, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const result = await Product.findOneAndDelete({ id: req.params.id });
    if (!result) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
