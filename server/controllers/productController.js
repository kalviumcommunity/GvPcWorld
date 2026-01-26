const Product = require('../models/Product');

// Get all products with filters
const getProducts = async (req, res) => {
  try {
    const { 
      category, 
      brand, 
      minPrice, 
      maxPrice, 
      search,
      sortBy,
      page = 1,
      limit = 12
    } = req.query;

    // Build filter object
    const filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort object
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case 'price_asc':
          sort.price = 1;
          break;
        case 'price_desc':
          sort.price = -1;
          break;
        case 'rating':
          sort.rating = -1;
          break;
        case 'newest':
          sort.createdAt = -1;
          break;
        default:
          sort.createdAt = -1;
      }
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalProducts: total
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      message: 'Error fetching products',
      error: error.message 
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      message: 'Error fetching product',
      error: error.message 
    });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ 
      message: 'Error adding product',
      error: error.message 
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ 
      message: 'Error updating product',
      error: error.message 
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      message: 'Error deleting product',
      error: error.message 
    });
  }
};

// Add a review to a product
const addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = {
      userId: req.user._id,
      rating: req.body.rating,
      comment: req.body.comment
    };

    product.reviews.push(review);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ 
      message: 'Error adding review',
      error: error.message 
    });
  }
};

// Get compatible products
const getCompatibleProducts = async (req, res) => {
  try {
    const { category, compatibilityKey } = req.query;
    if (!category || !compatibilityKey) {
      return res.status(400).json({ 
        message: 'Category and compatibilityKey are required' 
      });
    }

    const products = await Product.findCompatibleProducts(
      category,
      compatibilityKey
    );
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching compatible products:', error);
    res.status(500).json({ 
      message: 'Error fetching compatible products',
      error: error.message 
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getCompatibleProducts
};
