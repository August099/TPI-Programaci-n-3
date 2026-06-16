import { Container, Row, Col, Button } from "react-bootstrap";
import Item from "../card/card";

function Home() {
  const productos = [
    {
      id: 1,
      nombre: "Taladro Percutor",
      descripcion: "Taladro de alta potencia para trabajos profesionales.",
      precio: "$89.999",
      imagen:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c",
    },
    {
      id: 2,
      nombre: "Amoladora Angular",
      descripcion: "Ideal para cortar y desbastar diferentes materiales.",
      precio: "$74.999",
      imagen:
        "https://images.unsplash.com/photo-1581147036324-c1c6f25d8b77",
    },
    {
      id: 3,
      nombre: "Caja de Herramientas",
      descripcion: "Amplio espacio para organizar todas tus herramientas.",
      precio: "$29.999",
      imagen:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    },
    {
      id: 4,
      nombre: "Set Destornilladores",
      descripcion: "Juego completo para trabajos de precisión.",
      precio: "$14.999",
      imagen:
        "https://images.unsplash.com/photo-1530124566582-a618bc2615dc",
    },
  ];

  const categorias = [
    "Herramientas",
    "Electricidad",
    "Plomería",
    "Pinturería",
    "Construcción",
    "Jardinería",
  ];

  return (
    <div style={{ backgroundColor: "#FEE9E1" }}>
      {/* HERO */}
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
                src="https://images.unsplash.com/photo-1581147036324-c1c6f25d8b77"
                alt="Ferretería"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* CATEGORIAS */}
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

      {/* PRODUCTOS */}
      <Container className="py-5">
        <h2
          className="text-center mb-5 fw-bold"
          style={{ color: "#222725" }}
        >
          Productos Destacados
        </h2>

        <Row className="justify-content-center g-4">
          {productos.map((producto) => (
            <Col key={producto.id} xs="auto">
              <Item
                nombre={producto.nombre}
                descripcion={producto.descripcion}
                precio={producto.precio}
                imagen={producto.imagen}
              />
            </Col>
          ))}
        </Row>
      </Container>

      {/* BENEFICIOS */}
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

      {/* OFERTA */}
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