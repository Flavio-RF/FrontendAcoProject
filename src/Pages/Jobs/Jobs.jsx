import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      <h2>Trabajos</h2>
      {data ? (
        <div>
          <ul>
            {data.map((item) => (
              <Link key={item.id} to={`/clients/tasks/${item.id}/edit`}>
                <li>
                  <p>Plaga: {item.plague}</p>
                  <p>Fecha: {item.date}</p>
                  <p>Observaciones: {item.observations}</p>
                  <p>Razón: {item.reason}</p>
                  <p>Estado: {item.state ? "Hecho" : "Pendiente"}</p>
                  <p>Hora: {item.time}</p>
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
