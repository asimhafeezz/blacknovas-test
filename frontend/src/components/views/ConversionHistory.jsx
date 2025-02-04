import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants/constants";
import { FiRefreshCcw } from "react-icons/fi";

const ConversionHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/api/conversion-history`
      );
      setHistory(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="container mx-auto p-6 mt-2 mb-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-100">Conversion History</h2>
        <button
          onClick={fetchHistory}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <FiRefreshCcw className="mr-2" /> Refresh
        </button>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : history.length === 0 ? (
        <p className="text-gray-500">No history found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border p-3">From</th>
                <th className="border p-3">To</th>
                <th className="border p-3">Original Amount</th>
                <th className="border p-3">Converted Amount</th>
                <th className="border p-3">Rate</th>
                <th className="border p-3">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="border hover:bg-gray-100 transition">
                  <td className="border p-3">{item.fromCurrency}</td>
                  <td className="border p-3">{item.toCurrency}</td>
                  <td className="border p-3">{item.originalAmount}</td>
                  <td className="border p-3">{item.convertedAmount}</td>
                  <td className="border p-3">{item.rate}</td>
                  <td className="border p-3">{new Date(item.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ConversionHistory;