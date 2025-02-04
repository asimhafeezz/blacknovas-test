const {
  convertCurrency: getConversionRate,
  getConversionHistory,
} = require("../services/currencyService");

const convertCurrency = async (req, res) => {
  const { fromCurrency, toCurrency, amount } = req.body;
  if (!fromCurrency || !toCurrency || !amount) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const result = await getConversionRate(fromCurrency, toCurrency, amount);
    res.json(result);
  } catch (error) {
    console.error("Conversion Error:", error);
    res
      .status(500)
      .json({ error: "Conversion failed. Please check your input." });
  }
};

const fetchConversionHistory = async (req, res) => {
  try {
    const history = await getConversionHistory();
    res.json(history);
  } catch (error) {
    console.error("History Retrieval Error:", error);
    res.status(500).json({ error: "Failed to retrieve conversion history." });
  }
};

module.exports = { convertCurrency, fetchConversionHistory };
