const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  verifyProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { protect, adminOnly } = require('../middleware/auth.middleware');

// Public
router.get('/', getAllProducts);
router.get('/verify/:barcode', verifyProduct);
router.get('/:id', getProductById);

// Admin only
router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
