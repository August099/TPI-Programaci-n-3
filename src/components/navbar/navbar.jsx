import "./navbar.css"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ItemSearch from "../store/itemSearch/itemSearch";
import ConfigButton from "./configButton";

function StoreNavbar({onLogout}) {
  const navigate = useNavigate();

  /*const [itemSearch, setItemSearch] = useState("");

  const handleItemSearch = ({value, search}) => {
    setItemSearch(value);
    
    if (search) {
      navigate("/store/products")
    }
    
  };*/

  return (
    <Navbar
      className="w-100"
      expand="lg"
      style={{
        backgroundColor: "#222725",
      }}
    >
      <Container>

        <Navbar.Brand
          style={{
            color: "var(--green)",
            fontWeight: "bold",
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
              onClick={() => navigate("/store")}
              style={{
                color: "#FEE9E1",
                cursor: "pointer",
              }}
            >
              Inicio
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/store/products")}
              style={{
                color: "#FEE9E1",
                cursor: "pointer",
              }}
            >
              Productos
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/store/cart")}
              style={{
                color: "#FEE9E1",
                cursor: "pointer",
              }}
            >
              Carrito
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/store/items-admin")}
              style={{
                color: "#FEE9E1",
                cursor: "pointer",
              }}
            >
              Contacto
            </Nav.Link>

          </Nav>

          {/*<Nav>
            <ItemSearch onFindItem={handleItemSearch} value={itemSearch}/>
          </Nav>*/}

          <Nav>
            <ConfigButton onLogout={onLogout}/>
          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default StoreNavbar;