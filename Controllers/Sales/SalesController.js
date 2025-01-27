const dotenv = require("dotenv");
dotenv.config();
const Product = require("../../Models/Products/Products");

const decreaseStock = async (products) => {
  const bulkOperations = [];

  for (const { productId, quantity } of products) {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero!");
    }

    // Check if product exists and has sufficient stock
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found!`);
    }
    if (process.env.NEGATIVE_STOCK == "false" && product.stock < quantity) {
      const error = new Error(`Insufficient stock for product with ID ${productId}!`);
      error.code = "Insufficient stock";
      throw error;
    }

    // Add to bulk operations
    bulkOperations.push({
      updateOne: {
        filter: { _id: productId },
        update: { $inc: { stock: -quantity } }, // Decrement stock
      },
    });
  }
  return await Product.bulkWrite(bulkOperations);
};
module.exports = { decreaseStock };
