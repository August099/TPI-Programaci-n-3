import { Button, Card } from "react-bootstrap";

const Item = ({ nombre, descripcion, imagen, precio }) => {
  return (
    <Card
      style={{
        width: "18rem",
        backgroundColor: "#B09E99",
        color: "#222725",
        border: "none",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Card.Img
        style={{
          padding: "5px",
          borderRadius: "10px",
          height: "220px",
          objectFit: "cover",
        }}
        variant="top"
        src={imagen}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{nombre}</Card.Title>

        <Card.Text>{descripcion}</Card.Text>

        <h5 className="fw-bold mb-3">{precio}</h5>

        <Button
          style={{
            backgroundColor: "#06D6A0",
            border: "none",
            color: "#222725",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Item;