import axios from "axios";
import API_URL from "../../utils/config";
import { getToken } from "../../utils/token";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Form, Col, Button } from "react-bootstrap";

function Job() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [isDone, setisDone] = useState("");
  const navigate = useNavigate();
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
      navigate(`/clients/${id}/edit`);
      setError(false);
      setUpdating(false);
    } catch (error) {
      setError(true);
      console.log(error.response.data.error);
    }
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
      {error && (
        <p className="h3 text-danger">
          Error: No se encontro ningun cliente con ese ID
        </p>
      )}
      {data && (
        <div className="container-fluid mt-5">
          <h2 className="text-white my-5">Editar trabajo</h2>
          <div className="row">
            <Form onSubmit={handleSaveChanges} className="col-10 text-white">
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Plaga</Form.Label>
                  <Form.Control
                    placeholder="Nombre"
                    type="text"
                    name="plague"
                    value={formData.plague}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    placeholder="Fecha"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAddress1">
                  <Form.Label>Observaciones</Form.Label>
                  <Form.Control
                    placeholder="Observaciones"
                    type="text"
                    name="observations"
                    value={formData.observations}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAddress2">
                  <Form.Label>Razón</Form.Label>
                  <Form.Control
                    type="text"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <div className="d-flex align-items-center justify-content-start my-4">
                    <p className="me-2 mb-0">Estado:</p>
                    <div
                      className={
                        !isDone ? "btn btn-outline-danger " : "btn btn-primary"
                      }
                      autocomplete="off"
                      onClick={handleSwitchDone}
                    >
                      {isDone ? "Hecho" : "Pendiente"}
                    </div>
                  </div>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Hora:</Form.Label>
                  <Form.Control
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Row>
              <div className="mt-4 d-flex gap-3 mb-5">
                <Button variant="success" onClick={handleSaveChanges}>
                  Actualizar
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Job;
