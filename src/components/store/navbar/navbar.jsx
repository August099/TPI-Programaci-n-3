import "./navbar.css"
import { Container, Nav, Navbar, Dropdown,  } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ConfigButton from "./configButton";
import { isAdmin } from "../store.helpers";

function StoreNavbar({onLogout, role}) {
  const navigate = useNavigate();

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
                color: "whitesmoke",
                cursor: "pointer",
              }}
            >
              Inicio
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/store/products")}
              style={{
                color: "whitesmoke",
                cursor: "pointer",
              }}
            >
              Productos
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/store/cart")}
              style={{
                color: "whitesmoke",
                cursor: "pointer",
              }}
            >
              Carrito
            </Nav.Link>
            
            { isAdmin() &&
              <Dropdown className="d-inline mx-2" autoClose="outside">
                <Dropdown.Toggle className="bg-transparent border-0">
                  Administrar
                </Dropdown.Toggle>

                <Dropdown.Menu style={{backgroundColor: "#222725"}}>
                  <Dropdown.Item 
                    onClick={() => navigate('/store/items-admin')}
                    className="dropdown-item-admin"
                  >
                    Productos
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate('/store/users-admin')}
                    className="dropdown-item-admin"
                  >
                    Usuarios
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            }
          </Nav>
          <Nav>
            <ConfigButton onLogout={onLogout} role={role}/>
          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default StoreNavbar;