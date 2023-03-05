import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { removeToken } from "../utils/token";

function Nav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };
  return (
    <Navbar fixed="top" variant="dark" bg="dark">
      <Container fluid>
        <Navbar.Brand>
          <Link to={"/"}>ACO</Link>
        </Navbar.Brand>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </Container>
    </Navbar>
  );
}

export default Nav;
