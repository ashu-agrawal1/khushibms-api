const Product = require("../../Models/Products/Products");

const increaseStock = async (products) => {
  const bulkOperations = products.map(({ productId, quantity }) => {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero!");
    }
    return {
      updateOne: {
        filter: { _id: productId },
        update: { $inc: { stock: quantity } }, // Increment stock
      },
    };
  });

  return await Product.bulkWrite(bulkOperations);
};
module.exports = { increaseStock };
