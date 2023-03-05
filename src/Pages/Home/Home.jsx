import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Nav from "../../components/Navbar";
import Aside from "../../components/Aside";

function Home() {
  return (
    <Container fluid className="vh-100">
      <Row>
        <Nav />
      </Row>
      <Row className="mt-5">
        <Col sm={2} className="mt-5 d-flex justify-content-center">
          <Aside />
        </Col>
        <Col sm={10} className="px-0 mx-0">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
