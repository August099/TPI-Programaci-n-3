import { Container, Row, Col, Button } from "react-bootstrap";
import { getItems } from "../store.services.js";
import { useState, useEffect } from "react";
import CardItem from "../cardItem/cardItem.jsx";

const Home = () => {
  const categorias = ["categoria1", "categoria1", "categoria1"]
  const [items, setItems] = useState([])

  useEffect(() => {
      getItems(
          (data) => setItems(data),
          (err) => console.log(err)
      )
  }, [])


  return (
    <div style={{height: "100vh", width: "100%", overflowY: "auto", scrollbarWidth: "none" }}>
      <section
        style={{
          backgroundColor: "#222725",
          color: "#FEE9E1",
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-3 fw-bold">
                Todo para tus proyectos
              </h1>

              <p className="lead">
                Herramientas, materiales y accesorios para profesionales y
                aficionados.
              </p>

              <Button
                style={{
                  backgroundColor: "#5BC3EB",
                  border: "none",
                  color: "#222725",
                  fontWeight: "bold",
                }}
              >
                Ver Productos
              </Button>
            </Col>

            <Col md={6}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJh_K3ABWKn5F44bPHzYYJYJy04lrBzm7t_g&s"
                alt="Ferretería"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        <h2
          className="text-center mb-5 fw-bold"
          style={{ color: "#222725" }}
        >
          Categorías
        </h2>

        <Row className="g-3">
          {categorias.map((categoria, index) => (
            <Col md={4} lg={2} key={index}>
              <div
                className="text-center p-4 shadow-sm"
                style={{
                  backgroundColor: "#B09E99",
                  color: "#222725",
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                {categoria}
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="py-5">
        <h2
          className="text-center mb-5 fw-bold"
          style={{ color: "#222725" }}
        >
          Productos Destacados
        </h2>

        <Row className="justify-content-center g-4">
          {items.map((item) => (
            <Col key={item.id} xs="auto">
              <CardItem
                id={item.id}
                key={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                discount={item.discount}
                imageUrl={item.imageUrl}
                available={item.available}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <section
        style={{
          backgroundColor: "#B09E99",
          padding: "60px 0",
        }}
      >
        <Container>
          <Row className="text-center">
            <Col md={4}>
              <h1>🚚</h1>
              <h4>Envíos rápidos</h4>
              <p>Entregas a todo el país.</p>
            </Col>

            <Col md={4}>
              <h1>💳</h1>
              <h4>Cuotas sin interés</h4>
              <p>Pagá en cuotas con todas las tarjetas.</p>
            </Col>

            <Col md={4}>
              <h1>🔒</h1>
              <h4>Compra segura</h4>
              <p>Todas tus compras están protegidas.</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section
        style={{
          backgroundColor: "#222725",
          color: "#FEE9E1",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <Container>
          <h2 className="mb-4">
            Hasta 30% OFF en herramientas eléctricas
          </h2>

          <Button
            style={{
              backgroundColor: "#06D6A0",
              border: "none",
              color: "#222725",
              fontWeight: "bold",
            }}
          >
            Ver Ofertas
          </Button>
        </Container>
      </section>
    </div>
  );
}

export default Home;