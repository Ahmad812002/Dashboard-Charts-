import { useState, useEffect } from "react";
import React from "react";
import LineChart from "./Charts/LineChart";
import BarChart from "./Charts/BarChart";
import DoughnutChart from "./Charts/DoughnutChart";
import DarkMode from "./DarkMode/DarkMode";
import LoadingSpinner from "./loadingSpinner.png";
import "./Dashboard.css";

const Dashboard = () => {
  const [selectedChart, setSelectedChart] = useState("userGrowth");
  const [loading, setLoading] = useState(true);
  const [totalSales, setTotalSales] = useState(null);
  const [userGrowth, setUserGrowth] = useState(null);
  const [revenueBreakdown, setRevenueBreakdown] = useState(null);
  const [error, setError] = useState(null);

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark"; // Toggle theme based on current state
    document.querySelector("body").setAttribute("data-theme", newTheme); // Apply theme
    localStorage.setItem("selectedTheme", newTheme); // Save to local storage
    setDarkMode(!darkMode); // Toggle state
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("selectedTheme");
    if (storedTheme) {
      document.querySelector("body").setAttribute("data-theme", storedTheme);
      setDarkMode(storedTheme === "dark"); // Set dark mode based on stored value
    }
  }, []);

  //fetching data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [salesResponse, userGrowthResponse, revenueResponse] =
          await Promise.all([
            fetch("http://localhost:8000/totalSales"),
            fetch("http://localhost:8000/userGrowth"),
            fetch("http://localhost:8000/revenueBreakdown"),
          ]);

        const [salesData, userGrowthData, revenueData] = await Promise.all([
          salesResponse.json(),
          userGrowthResponse.json(),
          revenueResponse.json(),
        ]);

        setTotalSales(salesData);
        setUserGrowth(userGrowthData);
        setRevenueBreakdown(revenueData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChartChange = (e) => {
    setSelectedChart(e.target.value);
  };

  if (loading)
    return (
      <div className="loading-container">
        <img src={LoadingSpinner} alt="Loading..." className="loading-icon" />
        <div>Loading...</div>
      </div>
    );

  if(error) return <div className="error-message">{error}</div>;
  return (
    <div>
      <DarkMode toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <select
        onChange={handleChartChange}
        className="form-select mb-4"
        value={selectedChart}
      >
        <option value="" disabled>
          Select a chart
        </option>
        <option value="userGrowth">User Growth</option>
        <option value="totalSales">Total Sales</option>
        <option value="revenueBreakdown">Revenue Breakdown</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedChart === "userGrowth" && (
          <div className="chart-container">
            <LineChart data={userGrowth} />
          </div>
        )}
        {selectedChart === "totalSales" && (
          <div className="chart-container">
            <BarChart data={totalSales} />
          </div>
        )}
        {selectedChart === "revenueBreakdown" && (
          <div className="chart-container w-full">
            <DoughnutChart data={revenueBreakdown} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
