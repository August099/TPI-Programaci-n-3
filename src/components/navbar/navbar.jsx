import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

function ColorSchemesExample() {
  const navigate = useNavigate();

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "#222725",
      }}
    >
      <Container>

        <Navbar.Brand
          onClick={() => navigate("/home")}
          style={{
            color: "#06D6A0",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
        >
          AppEarre
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{
            backgroundColor: "#B09E99",
          }}
        />

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="mx-auto">

            <Nav.Link
              onClick={() => navigate("/home")}
              style={{
                color: "#FEE9E1",
                cursor: "pointer",
              }}
            >
              Inicio
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/productos")}
              style={{
                color: "#FEE9E1",
                cursor: "pointer",
              }}
            >
              Productos
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/carrito")}
              style={{
                color: "#FEE9E1",
                cursor: "pointer",
              }}
            >
              Carrito
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/contacto")}
              style={{
                color: "#FEE9E1",
                cursor: "pointer",
              }}
            >
              Contacto
            </Nav.Link>

          </Nav>

          <Nav>

            <Nav.Link
              onClick={() => navigate("/config")}
              style={{
                color: "#5BC3EB",
                cursor: "pointer",
              }}
            >
              <i className="bi bi-gear-fill fs-4"></i>
            </Nav.Link>

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default ColorSchemesExample;