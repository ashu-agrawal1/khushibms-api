const Tax = require("../../Models/Master/Tax");

const createTax = async (name, perc) => {
  const newTax = new Tax({
    name: name,
    percentage: perc,
  });
  return await newTax.save();
};
const viewTax = async () => {
  return await Tax.find();
};
const deleteTax = async (id) => {
  return await Tax.findByIdAndDelete(id);
};
const updateTax = async (id, updatedData) => {
  return await Tax.findByIdAndUpdate(id, updatedData, { new: true });
};

module.exports = { createTax, viewTax, deleteTax, updateTax };
