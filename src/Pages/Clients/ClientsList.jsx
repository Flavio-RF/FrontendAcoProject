import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../../utils/config";
import { getToken } from "../../utils/token";

function ClientsList({ data, setData }) {
  const handleDelete = async (id) => {
    try {
      const token = getToken();
      const res = await axios.delete(`${API_URL}/clients/${id}/delete`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {data ? (
        <Table striped bordered hover variant="dark" className="m-0 p-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Zona</th>
              <th>Email</th>
              <th>Celular</th>
              <th>Telefono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          {data.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.zone}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.phone}</td>
                <td>
                  <Link to={`/clients/${item.id}/edit`}>Editar</Link>
                  <button onClick={() => handleDelete(item.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      ) : (
        <p>loagind data....</p>
      )}
    </>
  );
}

export default ClientsList;
