import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/auth";
import API_URL from "../../utils/config";

function Jobs() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = getToken();
        const res = await axios.get(`${API_URL}/clients/tasks`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <h2>Jobs</h2>
      {data ? (
        <div>
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <p>Date: {item.date}</p>
                <p>Observations: {item.observations}</p>
                <p>Plague: {item.plague}</p>
                <p>Reason: {item.reason}</p>
                <p>State: {item.state}</p>
                <p>Time: {item.time}</p>
                <br />
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
export default Jobs;
