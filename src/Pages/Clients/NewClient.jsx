import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API_URL from "../../utils/config";
import { getToken } from "../../utils/token";
import { Button, Col, Form, Row } from "react-bootstrap";

function NewClient() {
  const navigate = useNavigate();
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
      const res = await axios.post(`${API_URL}/clients/create`, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setClientData(res.data);
      setError(false);
      navigate("/clients");
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
    setUpdating(false);
  };

  return (
    <div className="container mt-3 text-white">
      <h1 className="mb-4">Nuevo Cliente</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              placeholder="Nombre"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              placeholder="Dirección"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Zona</Form.Label>
            <Form.Control
              placeholder="Zona"
              type="text"
              name="zone"
              value={formData.zone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAddress2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="number"
              placeholder="Telefono"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="number"
              placeholder="Celular"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <div className="mt-4 d-flex gap-3">
          <Button variant="success" onClick={handleSubmit}>
            Guardar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              navigate("/clients");
            }}
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default NewClient;
