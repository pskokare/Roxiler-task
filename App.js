
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import './App.css';

function App() {
  const [month, setMonth] = useState('March');
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/transactions/combined`, {
          params: {
            month,
            search,
            page: currentPage
          }
        });
        const { transactions, statistics, barChart, pieChart, total, perPage } = response.data;

        setTransactions(transactions);
        setStatistics(statistics);
        setBarChartData(barChart);
        setPieChartData(pieChart);
        setTotalPage(Math.ceil(total / perPage));
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data.');
      }
    };

    fetchData();
  }, [month, search, currentPage]);

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Transactions Dashboard</h1>
        <select className="month-select" value={month} onChange={(e) => setMonth(e.target.value)}>
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </header>
      <div className="container">
        {error && <div className="error">{error}</div>}
        <div className="controls">
          <input
            className="search-input"
            type="text"
            placeholder="Search transactions..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <TransactionsTable transactions={transactions} />
        <div className="pagination-controls">
          <button className="pagination-button" disabled={currentPage === 1} onClick={handlePrevPage}>Previous</button>
          <button className="pagination-button" disabled={currentPage === totalPage} onClick={handleNextPage}>Next</button>
        </div>
        <div className="statistics">
          <Statistics statistics={statistics} />
        </div>
        <div className="charts">
          <div className="chart">
            <BarChart data={barChartData} />
          </div>
          <div className="chart">
            <PieChart data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
