const express = require("express");
const {
  createTax,
  viewTax,
  deleteTax,
  updateTax,
} = require("../../Controllers/Master/TaxController");
const { body, validationResult, param } = require("express-validator");
const taxRouter = express.Router();

taxRouter.get("/", async (req, res) => {
  try {
    const taxes = await viewTax();
    res.status(200).send(taxes);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something is broke!");
  }
});

taxRouter.post(
  "/",
  body("name").trim().not().isEmpty().isString(),
  body("perc").notEmpty().isNumeric(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send(result);
    try {
      await createTax(req.body.name, req.body.perc);
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something is broke!");
    }
  }
);

taxRouter.put(
  "/",
  body("name").trim().not().isEmpty().isString(),
  body("perc").notEmpty().isNumeric(),
  body("id").trim().notEmpty().isString(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send(result);
    try {
      await updateTax(req.body.id, {
        name: req.body.name,
        percentage: req.body.perc,
      });
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      return res.status(500).send("Something is broke!");
    }
  }
);

taxRouter.delete("/:id", async (req, res) => {
  try {
    await deleteTax(req.params.id);
    return res.status(200).json({ msg: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something is broke!");
  }
});

module.exports = taxRouter;
