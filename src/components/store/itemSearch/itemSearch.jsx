import { Form } from "react-bootstrap";

const ItemSearch = ({ onFindItem }) => {

  return (
    <Form.Group controlId="searchItem">
      <Form.Control
        type="text"
        placeholder="Buscar producto..."
        onKeyDown={(event) => {if (event.key === "Enter") onFindItem(event.target.value)}}
      />
    </Form.Group>
  );
};

export default ItemSearch;