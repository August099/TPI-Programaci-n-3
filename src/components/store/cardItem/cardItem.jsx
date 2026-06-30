import { Button, Card } from "react-bootstrap";
import { apllyDiscount } from "../store.helpers.js";
import { useNavigate } from "react-router";
import { addItemToCart } from "../store.services.js";
import { errorToast, successToast } from "../../ui/notifications/notifications.js";

const CardItem = ({ item }) => {
  const navigate = useNavigate()

  const handleAddToCart = () => {
    addItemToCart(
      {itemId: item.id, quantity: 1},
      (data) => successToast("Producto agregado al carrito."),
      (err) => errorToast("Error al agregar el producto.")
    )
  }

  return (
    <Card
      className="w-100 border-0 rounded-3"
      style={{
        backgroundColor: "var(--secondary)",
        color: "var(--black)"
      }}
    >
      <Card.Img
        style={{
          padding: "5px",
          borderRadius: "10px",
          width: "100%",
          aspectRatio: "1/1",
          objectFit: "cover",
          cursor: "pointer"
        }}
        variant="top"
        src={item.image}
        onClick={() => {navigate(`/store/item/${item.id}`)}}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="m-0 mb-1">{item.name}</Card.Title>

        <Card.Text className="description-clamp" style={{minHeight: "48px", maxHeight: "48px"}}>{item.description}</Card.Text>

        {item.discount ? <h5 className="fw-bold mb-3"><span style={{textDecoration: "line-through 2px", color: "GrayText", fontSize: "16px"}}>${item.price}</span> ${apllyDiscount(item)}</h5> : <h5 className="fw-bold mb-3">${item.price}</h5>}

        <Button
          style={{
            backgroundColor: "#06D6A0",
            border: "none",
            color: "#222725",
            width: "100%",
            fontWeight: "bold",
          }}
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardItem;