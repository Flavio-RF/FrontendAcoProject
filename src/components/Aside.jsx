import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "../Pages/Home/home.css";

function Aside() {
  return (
    <>
      <Nav className="flex-column mt-2 aside mt-4 m-0 align-items-start">
        <Link to={`/`} className="btn btn-outline-primary text-white">
          Inicio
        </Link>
        <Link
          to={`/clients`}
          className="btn btn-outline-primary my-2 text-white"
        >
          Clientes
        </Link>
        <Link
          to={`/clients/tasks`}
          className="btn btn-outline-primary text-white"
        >
          Trabajos
        </Link>
      </Nav>
    </>
  );
}

export default Aside;
