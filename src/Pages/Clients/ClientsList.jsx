import React, { useState } from "react";
import { Table, InputGroup, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../../utils/config";
import { getToken } from "../../utils/token";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

function ClientsList({ data, setData }) {
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id) => {
    try {
      const token = getToken();
      await axios.delete(`${API_URL}/clients/${id}/delete`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(data);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = (id) => {
    setDeleteUserId(id);
    setShowModal(true);
  };

  const handleDeleteUser = () => {
    handleDelete(deleteUserId);
    setShowModal(false);
  };

  const filteredData = data
    ? data.filter((item) => {
        const searchString =
          `${item.name} ${item.address} ${item.zone} ${item.email} ${item.mobile} ${item.phone}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
      })
    : [];

  return (
    <div className="container-fluid">
      <div className="row my-4 align-items-center justify-content-between me-5">
        <div className="col-8">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <div className="form-floating">
              <input
                type="text"
                className="form-control "
                placeholder="Buscar por nombre, dirección, zona, email, celular o teléfono"
                id="floatingInputGroup1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar"
              />
              <label htmlFor="floatingInputGroup1">
                Buscar por nombre, dirección, zona, email, celular o teléfono
              </label>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <Link to={`/clients/create`} className="btn btn-success">
            Agregar nuevo Cliente
          </Link>
        </div>
      </div>

      {data ? (
        <div className="table-responsive">
          <h1 className="mb-3 text-white">Clientes</h1>
          <table className="mb-0 table table-bordered table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Direccion</th>
                <th scope="col">Zona</th>
                <th scope="col">Email</th>
                <th scope="col">Celular</th>
                <th scope="col">Telefono</th>
                <th scope="col" className="text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            {filteredData.map((item) => (
              <tbody key={item.id}>
                <tr>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.zone}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>{item.phone}</td>
                  <td className="text-center">
                    <Link
                      className="btn btn-success btn-sm"
                      to={`/clients/${item.id}/newtasks`}
                    >
                      Nuevo
                    </Link>
                    <Link
                      className="btn btn-secondary btn-sm mx-2"
                      to={`/clients/${item.id}/edit`}
                    >
                      Editar
                    </Link>
                    <div
                      className="btn btn-danger btn-sm"
                      onClick={() => handleShowModal(item.id)}
                    >
                      Eliminar
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <ConfirmDeleteModal
            show={showModal}
            onHide={() => setShowModal(false)}
            onDelete={handleDeleteUser}
          />
        </div>
      ) : (
        <p>loading data....</p>
      )}
    </div>
  );
}

export default ClientsList;
