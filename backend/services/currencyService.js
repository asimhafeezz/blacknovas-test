const axios = require("axios");
const fs = require("fs");
const path = require("path");

const apiKey = process.env.EXCHANGE_RATE_APIKEY;
const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";
const historyFile = path.join(__dirname, "..", "data", "conversion_history.json");

// Function to get exchange rates
async function getExchangeRates() {
  try {
    const response = await axios.get(apiUrl, {
      params: { apiKey },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw new Error("Could not fetch exchange rates");
  }
}

// Function to save conversion history
function saveConversionHistory(conversion) {
  let history = [];
  try {
    if (fs.existsSync(historyFile)) {
      const data = fs.readFileSync(historyFile);
      history = JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading conversion history:", error);
  }

  history.push(conversion);

  try {
    fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));
  } catch (error) {
    console.error("Error saving conversion history:", error);
  }
}

// Function to retrieve conversion history
function getConversionHistory() {
  try {
    if (fs.existsSync(historyFile)) {
      const data = fs.readFileSync(historyFile);
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error retrieving conversion history:", error);
  }
  return [];
}

// Function to convert currency
async function convertCurrency(fromCurrency, toCurrency, amount) {
  try {
    const data = await getExchangeRates();
    const rate = data.rates[toCurrency];
    if (!rate) {
      throw new Error(`Conversion rate not available for ${toCurrency}`);
    }
    const convertedAmount = amount * rate;

    const conversion = {
      fromCurrency,
      toCurrency,
      originalAmount: amount,
      convertedAmount,
      rate,
      timestamp: new Date().toISOString(),
    };

    saveConversionHistory(conversion);

    return conversion;
  } catch (error) {
    console.error("Error converting currency:", error);
    throw new Error("Currency conversion failed");
  }
}

module.exports = {
  getExchangeRates,
  convertCurrency,
  getConversionHistory,
};
