import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config";
import { saveToken } from "../../utils/auth";

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
      const token = response.data.accessToken;
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
    <form onSubmit={handleSubmit}>
      <label>
        email:
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Mostrar el mensaje de error si existe */}
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;
