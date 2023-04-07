import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Nav from "../../components/Navbar";
import Aside from "../../components/Aside";
import "./home.css";

function Home() {
  return (
    <Container fluid className="vh-100">
      <Row className="mb-5">
        <Nav />
      </Row>
      <Row className="h-100">
        <Col sm={1} className="position-sticky aside bg-dark">
          <Aside />
        </Col>
        <Col sm={11} className="px-0 outlet">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
