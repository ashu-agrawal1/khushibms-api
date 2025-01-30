const express = require("express");
const {
  createProduct,
  viewProduct,
  deleteProduct,
  updateProduct,
  viewProductById,
} = require("../../Controllers/Products/ProductController");
const { body, validationResult } = require("express-validator");
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const productes = await viewProduct();
    res.status(200).send(productes);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something is broke!");
  }
});

productRouter.post(
  "/",
  body("name").trim().notEmpty().isString(),
  body("taxId").trim().notEmpty().isString(),
  body("category").trim().isString(),
  body("sellingPrice").notEmpty().isNumeric(),
  body("description").trim().isString(),
  body("brandName").trim().isString(),
  body("supplier").trim().isString(),
  body("hsn").trim().isString(),
  body("uniqueId").trim().isString(),
  body("mrp").trim().isNumeric(),
  body("stock").optional().isNumeric(),
  body("weight").optional().isNumeric(),
  body("unit").optional().isString(),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) return res.status(400).send(result);
      const {
        name,
        taxId,
        category,
        sellingPrice,
        description,
        brandName,
        supplier,
        hsn,
        uniqueId,
        mrp,
        stock,
        weight,
        unit,
      } = req.body;
      await createProduct({
        name,
        taxId,
        category,
        sellingPrice,
        description,
        brandName,
        supplier,
        hsn,
        uniqueId,
        mrp,
        stock,
        weight,
        unit,
      });
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something is broke!");
    }
  }
);

productRouter.put(
  "/",
  body("id").trim().notEmpty().isString(),
  body("name").trim().notEmpty().isString(),
  body("taxId").trim().notEmpty().isString(),
  body("category").trim().isString(),
  body("sellingPrice").notEmpty().isNumeric(),
  body("description").trim().isString(),
  body("brandName").trim().isString(),
  body("supplier").trim().isString(),
  body("hsn").trim().isString(),
  body("uniqueId").trim().isString(),
  body("mrp").trim().isNumeric(),
  body("stock").optional().isNumeric(),
  body("weight").optional().isNumeric(),
  body("unit").optional().isString(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send(result);
    try {
      const {
        id,
        name,
        taxId,
        category,
        sellingPrice,
        description,
        brandName,
        supplier,
        hsn,
        uniqueId,
        mrp,
        stock,
        weight,
        unit,
      } = req.body;
      await updateProduct(id, {
        name,
        taxId,
        category,
        sellingPrice,
        description,
        brandName,
        supplier,
        hsn,
        uniqueId,
        mrp,
        stock,
        weight,
        unit,
      });
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      return res.status(500).send("Something is broke!");
    }
  }
);

productRouter.delete("/:id", async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    return res.status(200).json({ msg: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something is broke!");
  }
});
productRouter.get("/:id", async (req, res) => {
  try {
    let data = await viewProductById(req.params.id);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something is broke!");
  }
});

module.exports = productRouter;
