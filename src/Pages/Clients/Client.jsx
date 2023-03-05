import axios from "axios";
import API_URL from "../../utils/config";
import { getToken } from "../../utils/token";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Client() {
  const { id } = useParams();
  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    zone: "",
    email: "",
    mobile: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setLoading(true);
    try {
      const token = getToken();
      const res = await axios.patch(`${API_URL}/clients/${id}/edit`, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setClientData(res.data);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error.response.data.error);
    }
    setLoading(false);
    setUpdating(false);
  };

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
        setClientData(res.data);
        setFormData(res.data);
        setError(false);
      } catch (error) {
        setError(true);
        console.log(error.response.data.error);
      }
      setLoading(false);
    }
    fetchData();
  }, [id, updating]);

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error: No se encontro ningun cliente con ese ID</p>
      ) : (
        clientData && (
          <div>
            <h2>Cliente</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="address">Dirección:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <label htmlFor="zone">Zona:</label>
              <input
                type="text"
                id="zone"
                name="zone"
                value={formData.zone}
                onChange={handleChange}
              />
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="mobile">Celular:</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
              <label htmlFor="phone">Teléfono:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <button type="submit">Actualizar</button>
            </form>
            {clientData.Jobs &&
              clientData.Jobs.map((job) => {
                return (
                  <div key={job.id}>
                    <h3>Trabajos</h3>
                    <ul>
                      <Link key={job.id} to={`/clients/tasks/${job.id}/edit`}>
                        <li>
                          <p>Fecha: {job.date}</p>
                          <p>Observaciones: {job.observations}</p>
                          <p>Plaga: {job.plague}</p>
                          <p>Razón: {job.reason}</p>
                          <p>Estado: {job.state}</p>
                          <p>Hora: {job.time}</p>
                          <br />
                        </li>
                      </Link>
                    </ul>
                  </div>
                );
              })}
          </div>
        )
      )}
    </div>
  );
}
export default Client;
