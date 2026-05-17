import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router';

function ColorSchemesExample() {


  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>

        <Navbar.Brand href="#home">
          AppEarre
        </Navbar.Brand>

        <Nav>
          <Nav.Link onClick={() => navigate("/login")} to="/Inicio">Inicio</Nav.Link>
          <Nav.Link to="/carrito">Carrito</Nav.Link>
          <Nav.Link  to="/contacto">Contacto</Nav.Link>
        </Nav>

        <Nav className="ms-auto">
          <Nav.Link href="#config">
            <i className="bi bi-gear-fill fs-4"></i>
          </Nav.Link>
        </Nav>

      </Container>
    </Navbar>
  );
}

export default ColorSchemesExample;