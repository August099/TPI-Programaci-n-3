import { Button, Form, Modal, InputGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getCategories } from '../../store/store.services.js';

const EditItem = ({ item, show, onClose, onConfirm}) => {

  const [categoriesList, setCategoriesList] = useState([])

  const [id, setId] = useState(0)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [stock, setStock] = useState(0)
  const [categories, setCategories] = useState([])
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    getCategories(
      (data) => setCategoriesList(data),
      (err) => console.log("Error al obtener las categorias")
    )
  }, [])

  useEffect(() => {
    if (item) {
      setId(item.id)
      setName(item.name)
      setDescription(item.description)
      setImage(item.image)
      setPrice(item.price)
      setDiscount(item.discount)
      setStock(item.stock)
      setCategories(item.categories.map(c => c.id))
      setAvailable(item.available) 
    }
  }, [item])

  const handleConfirm = () => {
    onConfirm(
      {
        id,
        name,
        description,
        image,
        price,
        discount,
        stock,
        categories,
        available
      }
    )
  }

  const handleSelectedCategories = (check, category) => {
      if (check) {
          setSelectedCategories([...selectedCategories, category])
      } else {
          setSelectedCategories(selectedCategories.filter((c) => c !== category))
      }
  }

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
                value={id}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del producto"
                value={name}
                onChange={(event) => {setName(event.target.value)}}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(event) => {setDescription(event.target.value)}}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL de la imagen"
                value={image}
                onChange={(event) => {setImage(event.target.value)}}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="0"
                  value={price}
                  onChange={(event) => {setPrice(event.target.value)}}
                  min={0}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descuento</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={100}
                placeholder="0"
                value={`${discount * 100}`}
                onChange={(event) => {setDiscount(event.target.value / 100)}}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                value={stock}
                onChange={(event) => {setStock(event.target.value)}}
                min={0}
              />
            </Form.Group>

            <Form.Group className="mb-3 d-flex gap-3">
              <Form.Label>Disponible</Form.Label>
              <Form.Check
                checked={available}
                onChange={(event) => {setAvailable(event.target.checked)}}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categorias</Form.Label>
              {categoriesList.map((category) => (
                  <div key={category.id} className="w-100 d-flex justify-content-between mt-1">
                      <label className="ms-2">{category.name}</label>
                      <Form.Check
                          checked={categories.includes(category.id)}
                          onChange={(event) => {
                              handleSelectedCategories(event.target.checked, category.id)
                          }
                      }/>
                  </div>
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditItem;