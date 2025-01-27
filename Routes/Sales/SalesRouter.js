const express = require("express");
const { decreaseStock } = require("../../Controllers/Sales/SalesController");
const { body, validationResult } = require("express-validator");
const salesRouter = express.Router();

salesRouter.post(
  "/",
  body("products").notEmpty().isArray({ min: 1 }),
  body("products.*").notEmpty().isObject(),
  body("products.*.quantity").notEmpty().isNumeric({ min: 1 }),
  body("products.*.productId").notEmpty().isString(),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) return res.status(400).send(result);
      await decreaseStock(req.body.products);
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      console.log(err);
      if (err.code == "Insufficient stock") {
        return res.status(400).send(err.message);
      }
      return res.status(500).send("Something is broke!");
    }
  }
);

module.exports = salesRouter;
