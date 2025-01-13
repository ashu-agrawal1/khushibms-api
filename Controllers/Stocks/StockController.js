const Product = require("../../Models/Products/Products");

const updateStock = async (productId, newStock) => {
  return await Product.findByIdAndUpdate(
    productId,
    { stock: newStock },
    { new: true } // Return the updated product after the update
  );
};
module.exports = { updateStock };
