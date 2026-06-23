import { Form } from "react-bootstrap";

const ItemSearch = ({ onFindItem, className = '' }) => {
  return (
    <Form.Group className={className} controlId="searchItem">
      <Form.Control
        type="text"
        placeholder="Buscar producto..."
        onKeyDown={(event) => {if (event.key === "Enter") onFindItem(event.target.value)}}
      />
    </Form.Group>
  );
};

export default ItemSearch;