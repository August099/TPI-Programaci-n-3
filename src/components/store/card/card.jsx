import { Button, Card } from 'react-bootstrap';

const Item = () => {
  return (
    <Card style={{
      width: '18rem',
      backgroundColor: "#B09E99",
      color: "white",
      border: "none",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
    }}>
      <Card.Img style={{ padding: '5px', borderRadius: '10px' }} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8oA9i0YmbajDg2-G6-iSIGGI7QbZfNB0Wsw&s" />
      <Card.Body>
        <Card.Title>Nombre del producto</Card.Title>
        <Card.Text>
          Descripcion del producto.
        </Card.Text>
        <Button style={{
          backgroundColor: "#06D6A0",
          border: "none",
          width: "100%"
        }} variant="primary">Agrega al Carrito</Button>
      </Card.Body>
    </Card>
  );
}

export default Item;