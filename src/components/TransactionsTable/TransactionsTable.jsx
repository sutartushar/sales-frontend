import { useState, useEffect } from "react";
import axios from "axios";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState("March");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [month, searchText, page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/transactions?month=${month}&searchText=${searchText}&page=${page}`
      );
      setTransactions(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <div>
      <h2>Transactions Table</h2>
      <label>Select Month:</label>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {Array.from({ length: 12 }, (_, i) => {
          const monthIndex = i + 1;
          const monthName = new Date(2022, i).toLocaleString("en-US", {
            month: "long",
          });
          return (
            <option key={monthIndex} value={monthName}>
              {monthName}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search Transaction"
      />
      <table>
        {/* Table Header */}
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Category</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {transactions &&
            transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{transaction.dateOfSale}</td>
                <td>{transaction.category}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={handlePrevPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default TransactionsTable;
