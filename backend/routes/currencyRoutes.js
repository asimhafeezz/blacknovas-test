const express = require("express");
const router = express.Router();
const {
  convertCurrency,
  fetchConversionHistory,
} = require("../controllers/currencyController");

router.post("/convert", convertCurrency);
router.get("/conversion-history", fetchConversionHistory);

module.exports = router;
