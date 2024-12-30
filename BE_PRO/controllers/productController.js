const Product = require("../models/Product");
 
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
}; 
const addProduct = async (req, res) => {
  const { name, description, price ,category} = req.body;

  try {
    const product = new Product({ name, description, price, category });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price,category } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: { name, description, price, category } },
      { new: true, runValidators: true } 
    );

    if (updatedProduct) {
      res.json({
        success: true,
        updatedProduct,
      });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
