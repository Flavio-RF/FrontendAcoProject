import axios from "axios";
import API_URL from "../../utils/config";
import { getToken } from "../../utils/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Job() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  console.log(data);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const token = getToken();
        const res = await axios.get(`${API_URL}/clients/tasks/${id}/edit`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setData(res.data);
        setError(false);
      } catch (error) {
        setError(true);
        console.log(error);
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  return (
    <div>
      {loading && <p>Loading data...</p>}
      {error && <p>Error: No se encontro ningun cliente con ese ID</p>}
      {data && (
        <div>
          <h2>Trabajo</h2>
          {data && (
            <div key={data.id}>
              <ul>
                <li>
                  <p>Plaga: {data.plague}</p>
                  <p>Fecha: {data.date}</p>
                  <p>Observaciones: {data.observations}</p>
                  <p>Razón: {data.reason}</p>
                  <p>Estado: {data.state ? "Hecho" : "Pendiente"}</p>
                  <p>Hora: {data.time}</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Job;
