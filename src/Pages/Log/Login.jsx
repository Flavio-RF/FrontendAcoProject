import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../utils/config";
import { saveToken } from "../../utils/token";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      const token = `Bearer ${response.data.accessToken}`;
      if (!token) {
        throw new Error("Token no recibido del servidor");
      } else {
        saveToken(token);
        navigate("/");
      }
      // redireccionar a la página de inicio
    } catch (error) {
      setError("Credenciales inválidas. Por favor intente de nuevo.");
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col xxs={8} sm={4}>
          <form onSubmit={handleSubmit} className="">
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </FloatingLabel>
            {error && <p style={{ color: "red" }}>{error}</p>}{" "}
            {/* Mostrar el mensaje de error si existe */}
            <div className="d-flex justify-content-center my-4">
              <Button type="submit" variant="success">
                iniciar Sesion
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
