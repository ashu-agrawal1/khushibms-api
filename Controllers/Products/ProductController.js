const Product = require("../../Models/Products/Products");

const createProduct = async (data) => {
  const newProduct = new Product(data);
  newProduct.save();
};
const viewProduct = async () => {
  return await Product.find();
};
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
const updateProduct = async (id, updatedData) => {
  return await Product.findByIdAndUpdate(id, updatedData, { new: true });
};

module.exports = { createProduct, viewProduct, deleteProduct, updateProduct };
