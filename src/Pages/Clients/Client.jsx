import axios from "axios";
import API_URL from "../../utils/config";
import { getToken } from "../../utils/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Client() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const token = getToken();
        const res = await axios.get(`${API_URL}/clients/${id}/edit`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setData(res.data);
        setError(false);
        console.log(res.data);
      } catch (error) {
        setError(true);
        console.log(error.response.data.error);
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
          <h2>Cliente</h2>
          <ul>
            <li>
              <p>Name: {data.name}</p>
              <p>Address: {data.address}</p>
              <p>Zone: {data.zone}</p>
              <p>Email: {data.email}</p>
              <p>Mobile: {data.mobile}</p>
              <p>Phone: {data.phone}</p>
            </li>
          </ul>
          {data.Jobs &&
            data.Jobs.map((job) => {
              return (
                <div key={job.id}>
                  <h3>trabajos</h3>
                  <ul>
                    <li>
                      <p>{job.plague}</p>
                      <p>{job.date}</p>
                      <p>{job.observations}</p>
                      <p>{job.reason}</p>
                      <p>{job.state}</p>
                      <p>{job.time}</p>
                    </li>
                  </ul>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
export default Client;
