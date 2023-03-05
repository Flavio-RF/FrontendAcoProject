import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function Aside() {
  return (
    <Nav className="flex-column align-items-start position-fixed">
      <Link to={`/`}>Inicio</Link>
      <Link to={`/clients`}>Clientes</Link>
      <Link to={`/clients/tasks`}>Trabajos</Link>
    </Nav>
  );
}

export default Aside;
