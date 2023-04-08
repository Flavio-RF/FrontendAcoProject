import axios from "axios";
import API_URL from "../../utils/config";
import { getToken } from "../../utils/token";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Form, Col, Button } from "react-bootstrap";

function Job() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDone, setisDone] = useState(false);
  console.log(isDone);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    plague: "",
    date: "",
    observations: "",
    reason: "",
    time: "",
    state: isDone,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = getToken();
      await axios.post(`${API_URL}/clients/${id}/newtasks`, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setError(false);
      navigate(`/clients/${id}/edit`);
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
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
        <p className="text-danger h3 mt-3 ms-3">Error: Ha ocurrido un error</p>
      )}
      <div className="container-fluid mt-5">
        <h2 className="text-white my-5">Nuevo trabajo</h2>
        <Form onSubmit={handleSubmit} className="col-9 text-white">
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
                    isDone ? "btn btn-primary" : "btn btn-outline-danger"
                  }
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
            <Button
              variant="success"
              size="md"
              onClick={handleSubmit}
              className="px-5"
            >
              Crear
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Job;
