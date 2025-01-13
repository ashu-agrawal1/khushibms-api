const express = require("express");
const { increaseStock } = require("../../Controllers/Purchase/PurchaseController");
const { body, validationResult } = require("express-validator");
const purchaseRouter = express.Router();

purchaseRouter.post(
  "/",
  body("products").notEmpty().isArray({ min: 1 }),
  body("products.*").notEmpty().isObject(),
  body("products.*.quantity").notEmpty().isNumeric({min:1}),
  body("products.*.productId").notEmpty().isString(),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) return res.status(400).send(result);
      await increaseStock(req.body.products);
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something is broke!");
    }
  }
);

module.exports = purchaseRouter;
