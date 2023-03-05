import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/token";
import API_URL from "../../utils/config";

function Jobs() {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const token = getToken();
        let url = `${API_URL}/clients/tasks`;

        url +=
          filter === "done"
            ? "?state=true"
            : filter === "pending"
            ? "?state=false"
            : "";
        url +=
          startDate && endDate
            ? `&startDate=${startDate}&endDate=${endDate}`
            : "";

        const res = await axios.get(url, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [filter, startDate, endDate]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div>
      <h2>Jobs</h2>
      <div>
        <label htmlFor="filter">Filter:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="done">Hechos</option>
          <option value="pending">Pendientes</option>
        </select>
      </div>
      <div>
        <label htmlFor="startDate">Start date:</label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div>
        <label htmlFor="endDate">End date:</label>
        <input
          id="endDate"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
      {data ? (
        <div>
          <ul>
            {data.map((item) => (
              <Link key={item.id} to={`/clients/tasks/${item.id}/edit`}>
                <li>
                  <p>Plague: {item.plague}</p>
                  <p>Date: {item.date}</p>
                  <p>Observations: {item.observations}</p>
                  <p>Reason: {item.reason}</p>
                  <p>State: {item.state ? "Hecho" : "Pendiente"}</p>
                  <p>Time: {item.time}</p>
                  <br />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default Jobs;
