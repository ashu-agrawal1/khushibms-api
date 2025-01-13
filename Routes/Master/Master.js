const express = require("express");
const masterRouter = express.Router();

const taxRouter = require("./TaxRouter.js");

masterRouter.use("/tax", taxRouter);

module.exports = masterRouter;
