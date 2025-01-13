const express = require("express");
const { updateStock } = require("../../Controllers/Stocks/StockController");
const { body, validationResult } = require("express-validator");
const stockRouter = express.Router();

stockRouter.post(
  "/addstock",
  body("productId").trim().notEmpty().isString(),
  body("quantity").notEmpty().isNumeric(),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) return res.status(400).send(result);
      const { productId, quantity } = req.body;
      await updateStock({ productId, quantity });
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something is broke!");
    }
  }
);

module.exports = stockRouter;
