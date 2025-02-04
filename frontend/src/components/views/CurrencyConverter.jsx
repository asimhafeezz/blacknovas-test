import React, { useState } from "react";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants/constants";

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_API_URL}/api/convert`, {
        fromCurrency,
        toCurrency,
        amount,
      });
      setConvertedAmount(response.data.convertedAmount);
      setExchangeRate(response.data.rate);
      setError("");
    } catch (err) {
      setError("Conversion failed. Please check your input.");
      setConvertedAmount(null);
      setExchangeRate(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nyxCipher nyxBorderTop nyxContainer" id="toolkit">
      <div className="px-[50px] pt-[24px] lg:pb-[10px]">
        <div className="vibration xl:col-span-1 lg:col-span-2 col-span-2 fadeUpAnimation">
          <div className="shape-container">
            <div className="shape-outer customize-outer">
              <div className="shape-inner customize-inner relative">
                <div className="px-[50px] pt-[24px] lg:pb-[10px] pb-[10px]">
                  <div className="box">
                    <p className="text-white p-[12px] md:p-[15px] font-regular md:font-bold md:text-[25px] sm:text-[17px] text-[15px]">
                      Converter
                    </p>
                  </div>
                  <p className="text-[#EEEEEE] font-regular md:text-[18px] sm:text-[14px] text-[13px] line leading-normal mt-[18px]">
                    Convert currency from one to another
                  </p>
                </div>
                <div className="flex items-center justify-center flex-col">
                  <label>From Currency:</label>
                  <input
                    type="text"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="border p-2 w-80 mb-3 rounded text-black"
                  />

                  <label>To Currency:</label>
                  <input
                    type="text"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="border p-2 w-80 mb-3 rounded text-black"
                  />

                  <label>Amount:</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border p-2 w-80 mb-4 rounded text-black"
                  />

                  <button
                    onClick={handleConvert}
                    className="mb-5 w-80 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    disabled={loading}
                  >
                    {loading ? "Converting..." : "Convert"}
                  </button>

                  {loading && (
                    <div className="mt-4 text-blue-500">Loading...</div>
                  )}

                  {convertedAmount && !loading && (
                    <div className="mb-5 mt-4 p-3 bg-green-100 rounded text-black text-center">
                      <p>
                        Converted Amount: <strong>{convertedAmount}</strong>
                      </p>
                      <p>Exchange Rate: <strong>{exchangeRate}</strong></p>
                    </div>
                  )}

                  {error && !loading && (
                    <p className="text-red-500 mt-3 text-center">{error}</p>
                  )}
                </div>
              </div>
            </div>
            <img
              className="border-bottom-left"
              src="./assets/images/nyxBorderBox/border-bottom-left.png"
              alt="Border Bottom Left"
            />
            <img
              className="border-top-right"
              src="./assets/images/nyxBorderBox/border-top-right.png"
              alt="Border Top Right"
            />
            <img
              className="border-right"
              src="./assets/images/nyxBorderBox/border-right.png"
              alt="Border Right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
