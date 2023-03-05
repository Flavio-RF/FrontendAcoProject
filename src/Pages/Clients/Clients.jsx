import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../utils/config";
import { getToken } from "../../utils/token";
import ClientsList from "./ClientsList";

function Clients() {
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
  return <ClientsList data={data} setData={setData} />;
}
export default Clients;
