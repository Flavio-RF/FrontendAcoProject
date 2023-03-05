import axios from "axios";
import API_URL from "../../utils/config";
import { getToken } from "../../utils/token";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Job() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [isDone, setisDone] = useState("");
  const [formData, setFormData] = useState({
    plague: "",
    date: "",
    observations: "",
    reason: "",
    time: "",
    state: "",
  });

  useEffect(() => {
    fetchData();
  }, [id, updating]);

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
      setFormData(res.data);
      setisDone(res.data.state);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  }

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const token = getToken();
      await axios.patch(`${API_URL}/clients/tasks/${id}/edit`, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setData(formData);
    } catch (error) {
      console.log(error);
    }
    setUpdating(false);
  };

  const handleSwitchDone = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      state: !isDone,
    }));
    setisDone(!isDone);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      {loading && <p>Loading data...</p>}
      {error && <p>Error: No se encontro ningun cliente con ese ID</p>}
      {data && (
        <div>
          <h2>Trabajo</h2>
          <form onSubmit={handleSaveChanges}>
            <div key={data.id}>
              <ul>
                <li>
                  <p>
                    Plaga:{" "}
                    <input
                      type="text"
                      name="plague"
                      value={formData.plague}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    Fecha:{" "}
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    Observaciones:{" "}
                    <input
                      type="text"
                      name="observations"
                      value={formData.observations}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    Razón:{" "}
                    <input
                      type="text"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    Estado:
                    <button onClick={handleSwitchDone}>
                      {isDone ? "Hecho" : "Pendiente"}
                    </button>
                  </p>
                  <p>
                    Hora:{" "}
                    <input
                      type="text"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                    />
                  </p>
                  <button type="">Guardar cambios</button>
                </li>
              </ul>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Job;
