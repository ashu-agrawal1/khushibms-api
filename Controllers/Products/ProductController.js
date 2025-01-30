const Product = require("../../Models/Products/Products");

const createProduct = async (data) => {
  const newProduct = new Product(data);
  return newProduct.save();
};
const viewProduct = async () => {
  let products = await Product.find().populate("taxId").exec();
  return products?.map((product) => {
    const productObj = product.toObject(); // Convert Mongoose document to plain object
    productObj.taxName = productObj?.taxId?.name;
    productObj.taxPercentage = productObj?.taxId?.percentage;
    productObj.tax_id = productObj?.taxId?._id;
    return productObj;
  });
};
const viewProductById = async (id) => {
  let product = await Product.findById(id).populate("taxId").exec();
  const productObj = product.toObject(); // Convert Mongoose document to plain object
  productObj.taxName = productObj?.taxId?.name;
  productObj.taxPercentage = productObj?.taxId?.percentage;
  productObj.tax_id = productObj?.taxId?._id;
  return productObj;
};
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
const updateProduct = async (id, updatedData) => {
  return await Product.findByIdAndUpdate(id, updatedData, { new: true });
};

module.exports = {
  createProduct,
  viewProduct,
  deleteProduct,
  updateProduct,
  viewProductById,
};
