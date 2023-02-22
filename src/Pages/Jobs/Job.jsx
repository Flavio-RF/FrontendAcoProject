import axios from "axios";
import API_URL from "../../utils/config";
import { getToken } from "../../utils/auth";
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
  console.log(formData);

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

  const handleSaveChanges = async () => {
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

  const handleSwitchDone = () => {
    setFormData((prevState) => ({
      ...prevState,
      state: !isDone,
    }));
    setisDone(!isDone);
  };

  return (
    <div>
      {loading && <p>Loading data...</p>}
      {error && <p>Error: No se encontro ningun cliente con ese ID</p>}
      {data && (
        <div>
          <h2>Trabajo</h2>
          <div key={data.id}>
            <ul>
              <li>
                <p>
                  Plaga:{" "}
                  <input
                    type="text"
                    name="plague"
                    value={formData.plague}
                    onChange={handleSwitchDone}
                  />
                </p>
                <p>
                  Fecha:{" "}
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleSwitchDone}
                  />
                </p>
                <p>
                  Observaciones:{" "}
                  <input
                    type="text"
                    name="observations"
                    value={formData.observations}
                    onChange={handleSwitchDone}
                  />
                </p>
                <p>
                  Razón:{" "}
                  <input
                    type="text"
                    name="reason"
                    value={formData.reason}
                    onChange={handleSwitchDone}
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
                    onChange={handleSwitchDone}
                  />
                </p>
                <button onClick={handleSaveChanges}>Guardar cambios</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Job;
