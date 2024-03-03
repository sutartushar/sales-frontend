// TransactionsStatistics.js
import { useState, useEffect } from "react";
import axios from "axios";

const TransactionsStatistics = () => {
  const [statistics, setStatistics] = useState({});
  const [month, setMonth] = useState("March");

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/statistics?month=${month}`);
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2>Transactions Statistics</h2>
      <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
      <p>Total Sold Items: {statistics.totalSoldItems}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
    </div>
  );
};

export default TransactionsStatistics;
