import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../utils/config";
import { getToken } from "../../utils/auth";

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/clients`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1>home</h1>
      {data ? (
        <div>
          <h2>Clients</h2>
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <p>Name: {item.name}</p>
                <p>Address: {item.address}</p>
                <p>Zone: {item.zone}</p>
                <p>Email: {item.email}</p>
                <p>ID: {item.id}</p>
                <p>Mobile: {item.mobile}</p>
                <p>Phone: {item.phone}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default Home;
