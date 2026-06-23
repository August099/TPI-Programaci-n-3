import { Button, Form, Modal, InputGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const SetRol = ({ item, show, onClose, onConfirm}) => {

  const [idValue, setIdValue] = useState(item?.id)
  const [titleValue, setTitleValue] = useState(item?.title)
  const [descriptionValue, setDescriptionValue] = useState(item?.description)
  const [priceValue, setPriceValue] = useState(item?.price)
  const [discountValue, setDiscountValue] = useState(item?.discount)
  const [imageUrlValue, setImageUrlValue] = useState(item?.imageUrl)
  const [availableValue, setAvailableValue] = useState(item?.available)

  useEffect(() => {
    setIdValue(item?.id)
    setTitleValue(item?.title)
    setDescriptionValue(item?.description)
    setPriceValue(item?.price)
    setDiscountValue(item?.discount)
    setImageUrlValue(item?.imageUrl)
    setAvailableValue(item?.available)
  }, [item])

  return (
    <>
      <Modal show={show} onHide={onClose} backdrop="static" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Editar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{scrollbarWidth: "none"}}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="number"
                value={idValue}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del producto"
                value={titleValue}
                onChange={(event) => {setTitleValue(event.target.value)}}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={descriptionValue}
                onChange={(event) => {setDescriptionValue(event.target.value)}}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="0"
                  value={priceValue}
                  onChange={(event) => {setPriceValue(event.target.value)}}
                  min={0}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descuento</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={1}
                step={0.01}
                placeholder="0"
                value={`${discountValue}`}
                onChange={(event) => {setDiscountValue(event.target.value)}}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL de la imagen"
                value={imageUrlValue}
                onChange={(event) => {setImageUrlValue(event.target.value)}}
              />
            </Form.Group>

            <Form.Group className="mb-3 d-flex gap-3">
              <Form.Label>Disponible</Form.Label>
              <Form.Check
                checked={availableValue}
                onChange={(event) => {setAvailableValue(event.target.value)}}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SetRol;