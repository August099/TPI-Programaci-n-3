import { Button, Card } from "react-bootstrap";

const CardItem = ({ id, title, description, price, discount, imageUrl, available }) => {
  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "260px",
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
          width: "100%",
          aspectRatio: "1/1",
          objectFit: "cover",
        }}
        variant="top"
        src={imageUrl}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="title-clamp m-0 mb-1" style={{minHeight: "48px", maxHeight: "48px"}}>{title}</Card.Title>

        <Card.Text className="description-clamp" style={{minHeight: "48px", maxHeight: "48px"}}>{description}</Card.Text>

        {discount ? <h5 className="fw-bold mb-3"><span style={{textDecoration: "line-through 2px", color: "GrayText", fontSize: "16px"}}>${price}</span> ${price * (1 - discount)}</h5> : <h5 className="fw-bold mb-3">${price}</h5>}

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

export default CardItem;