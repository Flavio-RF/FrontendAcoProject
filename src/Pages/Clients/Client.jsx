import axios from "axios";
import API_URL from "../../utils/config";
import { getToken } from "../../utils/token";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";

function Client() {
  const { id } = useParams();
  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [isDone, setisDone] = useState("");
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
        console.log(res.data.Jobs);

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
          <div className="container-fluid text-white">
            <h2 className="my-3">Cliente: {formData.name}</h2>
            <Form onSubmit={handleSubmit} className="col-9">
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
              <div className="mt-4 d-flex gap-3 mb-5">
                <Button variant="success" onClick={handleSubmit}>
                  Actualizar
                </Button>
              </div>
            </Form>
            {clientData.Jobs &&
              clientData.Jobs.map((job) => {
                return (
                  <div key={job.id}>
                    <h3 className="my-3">Trabajos</h3>
                    <div className="table-responsive">
                      <table className="mb-0 table table-bordered table-dark table-hover">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Observaciones</th>
                            <th scope="col">Plaga</th>
                            <th scope="col">Razón</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Hora</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody key={job.id}>
                          <tr>
                            <th scope="row">{job.id}</th>
                            <td>{job.date}</td>
                            <td>{job.observations}</td>
                            <td>{job.plague}</td>
                            <td>{job.reason}</td>
                            <td>{job.state ? "Hecho" : "Pendiente"}</td>
                            <td>{job.time}</td>
                            <td className="text-center">
                              <Link className="btn btn-secondary btn-sm">
                                Editar
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
