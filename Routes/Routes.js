const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();
const masterRouter = require("./Master/Master.js");
const productRouter = require("./Products/ProductRouter.js");
const stockRouter = require("./Stocks/StockRouter");
const purchaseRouter = require("./Purchase/PurchaseRouter.js");
const salesRouter = require("./Sales/SalesRouter.js");

router.get("/", async (req, res) => {
  res.json("hii, welcome");
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username == process.env.USER && password == process.env.PASSWORD) {
      req.session.user = {
        name: username,
      };
      return res.status(200).send();
    } else {
      return res.status(400).send("Invalid Username or Password");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

router.use("/master", masterRouter);
router.use("/products", productRouter);
router.use("/stock", stockRouter);
router.use("/purchase", purchaseRouter);
router.use("/sales", salesRouter);

router.get("/logout", async (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error during Logout");
    }

    res.clearCookie("connect.sid"); // Clear the session cookie
    res.status(200).send("Logout successful");
  });
});
module.exports = { router };
