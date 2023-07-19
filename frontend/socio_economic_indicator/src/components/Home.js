import React, { useState, useEffect } from "react";
import { fetchData } from "../services/fetchData";
import CustomBarChart from "./charts/BarChart";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import CustomLineChart from "./charts/LineChart";
import CustomPieChart from "./charts/PieChart";
import CustomAreaChart from "./charts/AreaChart";
import CustomColumnChart from "./charts/ColumnChart";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedIndicator, setSelectedIndicator] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [chartData, setChartData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [viewData, setViewData] = useState({});
  const [viewName, setViewName] = useState("");
  const [selectedChartType, setSelectedChartType] = useState("ColumnChart");

  const fetchCountries = async () => {
    const storedCountries = localStorage.getItem("countries");
   
      fetch(`http://api.worldbank.org/v2/country?per_page=1000&format=json`)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          setCountries((prevCountries) => {
            const countries = data[1].map((country) => {
              return {
                country: country.name,
                id: country.id,
                iso2Code: country.iso2Code,
              };
            });
            console.log(countries);
            return [...prevCountries, ...countries];
          });
          localStorage.setItem("countries", countries);
        })
        .catch((error) => console.error(error));
    
  };

  const fetchIndicators = async () => {
    const storedIndicators = localStorage.getItem("indicators");
      await fetch(
        `http://api.worldbank.org/v2/indicator?per_page=1000&format=json`
      )
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          setIndicators((prevIndicators) => {
            const indicators = data[1].map((indicator) => {
              return {
                name: indicator.name,
                id: indicator.id,
              };
            });
            console.log(indicators);
            return [...prevIndicators, ...indicators];
          });
          localStorage.setItem("indicators", indicators);
        })
        .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchCountries();
    fetchIndicators();
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleIndicatorChange = (event) => {
    console.log(event.target.value);
    setSelectedIndicator(event.target.value);
  };

  const handleStartMonthChange = (event) => {
    setStartMonth(event.target.value);
  };

  const handleEndMonthChange = (event) => {
    setEndMonth(event.target.value);
  };

  const handleViewName = (event) => {
    setViewName(event.target.value);
    setViewData((prevViewData) => {
        return { ...prevViewData, name: event.target.value };
      });

  };

  const handleFetchData = async () => {
    const chartData = await fetchData({
      selectedCountry,
      selectedIndicator,
      startMonth,
      endMonth,
    });
    if (chartData.length === 0) {
      console.log("No data found");
      setNoData(true);
    } else {
      setNoData(false);
    }
    setChartData(chartData);
    const viewData = {
      country: selectedCountry,
      chartType: selectedChartType,
      indicator: selectedIndicator,
      startDate: startMonth,
      endDate: endMonth,
    };

    setViewData(viewData);
  };

  const saveView = async (event) => {
    setViewData((prevViewData) => {
        return { ...prevViewData , name: viewName, chartType: selectedChartType };
      });
    console.log(viewData);
    const response = await fetch("http://localhost:8080/view", {
      method: "POST",
      body: JSON.stringify(viewData),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("View saved");
    }
  };

  const handleChartTypeChange = (event) => {
    setSelectedChartType(event.target.value);
    setViewData((prevViewData) => {
        return { ...prevViewData, chartType: event.target.value };
      });
  };

  return (
    <div>
      <div>
        <label>Select Country:</label>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">--Select Country--</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.country} ({country.iso2Code})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Indicator:</label>
        <select value={selectedIndicator} onChange={handleIndicatorChange}>
          <option value="">--Select Indicator--</option>
          {indicators.map((indicator) => (
            <option key={indicator.id} value={indicator.id}>
              {indicator.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Start Month:</label>
        <input
          type="month"
          value={startMonth}
          onChange={handleStartMonthChange}
        />
      </div>
      <div>
        <label>End Month:</label>
        <input type="month" value={endMonth} onChange={handleEndMonthChange} />
      </div>
      <button onClick={handleFetchData}>Fetch Data</button>
      {noData ? <p>No data found</p> : null}
      {chartData.length !== 0 ? (
        <div>
          {" "}
          <select value={selectedChartType} onChange={handleChartTypeChange}>
            <option value="AreaChart">Area Chart</option>
            <option value="BarChart">Bar Chart</option>
            <option value="ColumnChart">Column Chart</option>
            <option value="LineChart">Line Chart</option>
            <option value="PieChart">Pie Chart</option>
          </select>
          {selectedChartType === "AreaChart" ? (
            <CustomAreaChart data={chartData} />
          ) : null}
          {selectedChartType === "BarChart" ? (
            <CustomBarChart data={chartData} />
          ) : null}
          {selectedChartType === "ColumnChart" ? (
            <CustomColumnChart data={chartData} />
          ) : null}
          {selectedChartType === "LineChart" ? (
            <CustomLineChart data={chartData} />
          ) : null}
          {selectedChartType === "PieChart" ? (
            <CustomPieChart data={chartData} />
          ) : null}
          <label>View Name:</label>
          <input type="text" value={viewName} onChange={handleViewName} />
          <button onClick={saveView}> Save View </button>
        </div>
      ) : null}

      <Link to="/views">Show Saved Views</Link>
    </div>
  );
};

export default Home;
