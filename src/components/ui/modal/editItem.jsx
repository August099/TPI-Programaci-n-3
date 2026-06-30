import { Button, Form, Modal, InputGroup, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getCategories, addCategory } from '../../store/store.services.js';
import { errorToast } from '../notifications/notifications.js';
import { validateItem } from './validations/validations.helpers.js';

const EditItem = ({ item, show, onClose, onConfirm}) => {

  const [categoriesList, setCategoriesList] = useState([])
  const [newCategory, setNewCategory] = useState("")

  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [stock, setStock] = useState(0)
  const [categories, setCategories] = useState([])
  const [available, setAvailable] = useState(false)

  const [nameErrorMessage, setNameErrorMessage] = useState(null);
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState(null);
  const [imageErrorMessage, setImageErrorMessage] = useState(null);
  const [priceErrorMessage, setPriceErrorMessage] = useState(null);
  const [discountErrorMessage, setDiscountErrorMessage] = useState(null);
  const [stockErrorMessage, setStockErrorMessage] = useState(null);
  const [categoryErrorMessage, setCategoryErrorMessage] = useState(null);

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

      setNewCategory("")

      setNameErrorMessage(null)
      setDescriptionErrorMessage(null)
      setImageErrorMessage(null)
      setPriceErrorMessage(null)
      setDiscountErrorMessage(null)
      setStockErrorMessage(null)
      setCategoryErrorMessage(null)
    }
  }, [item])

  useEffect(() => {
    if (!item) {
      setId("")
      setName('')
      setDescription('')
      setImage('')
      setPrice(0)
      setDiscount(0)
      setStock(0)
      setCategories([])
      setAvailable(false)

      setNewCategory("")

      setNameErrorMessage(null)
      setDescriptionErrorMessage(null)
      setImageErrorMessage(null)
      setPriceErrorMessage(null)
      setDiscountErrorMessage(null)
      setStockErrorMessage(null)
      setCategoryErrorMessage(null)
    }

    if (show) {
      getCategories(
        (data) => setCategoriesList(data),
        (err) => errorToast("Error al obtener las categorias.")
      )
    }
  }, [ show ])

  const hasErrors = (errors) => {
    const {name, description, image, price, discount, stock} = errors

    if (name || description || image || price || discount || stock) {
      setNameErrorMessage(name)
      setDescriptionErrorMessage(description)
      setImageErrorMessage(image)
      setPriceErrorMessage(price)
      setDiscountErrorMessage(discount)
      setStockErrorMessage(stock)
      return true
    }

    return false
  }

  const handleConfirm = () => {
    const item = {
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

    const errors = validateItem(item)

    if (hasErrors(errors)) return

    onConfirm(item)
  }

  const handleSelectedCategories = (check, category) => {
      if (check) {
          setCategories([...categories, category])
      } else {
          setCategories(categories.filter((c) => c !== category))
      }
  }

  const handleAddCategory = () => {
    if (categoriesList.map(c => c.name).includes(newCategory)) {
      setCategoryErrorMessage("Categoria existente.")
      return
    }

    addCategory(
      {name: newCategory},
      (data) => {
        setCategoriesList((prevCategories) => 
          [...prevCategories, data]
        )
        setNewCategory("")
      },
      (err) => errorToast("Error al agregar la categoria.")
    )
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
                onChange={(event) => {setName(event.target.value), setNameErrorMessage(null)}}
                autoFocus
                className={nameErrorMessage && "border border-danger border-3"}
              />
              {nameErrorMessage && <Form.Label>{nameErrorMessage}</Form.Label>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(event) => {setDescription(event.target.value), setDescriptionErrorMessage(null)}}
                className={descriptionErrorMessage && "border border-danger border-3"}
              />
              {descriptionErrorMessage && <Form.Label>{descriptionErrorMessage}</Form.Label>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL de la imagen"
                value={image}
                onChange={(event) => {setImage(event.target.value), setImageErrorMessage(null)}}
                className={imageErrorMessage && "border border-danger border-3"}
              />
              {imageErrorMessage && <Form.Label>{imageErrorMessage}</Form.Label>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="0"
                  value={price}
                  onChange={(event) => {setPrice(event.target.value), setPriceErrorMessage(null)}}
                  min={0}
                  className={priceErrorMessage && "border border-danger border-3"}
                />
              </InputGroup>
              {priceErrorMessage && <Form.Label>{priceErrorMessage}</Form.Label>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descuento</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={100}
                placeholder="0"
                value={`${discount * 100}`}
                onChange={(event) => {setDiscount(event.target.value / 100), setDiscountErrorMessage(null)}}
                className={discountErrorMessage && "border border-danger border-3"}
              />
              {discountErrorMessage && <Form.Label>{discountErrorMessage}</Form.Label>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                value={stock}
                onChange={(event) => {setStock(event.target.value), setStockErrorMessage(null)}}
                min={0}
                className={stockErrorMessage && "border border-danger border-3"}
              />
              {stockErrorMessage && <Form.Label>{stockErrorMessage}</Form.Label>}
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
                
              <InputGroup className='my-2' style={{height: "30px"}}>
                <Button
                  className='h-100 p-0 px-2'
                  onClick={handleAddCategory}
                >
                  Agregar
                </Button>
                <Form.Control
                  type='text'
                  placeholder='Agregar categoria'
                  value={newCategory}
                  onChange={(event) => {setNewCategory(event.target.value), setCategoryErrorMessage(null)}}
                  className={categoryErrorMessage ? "border border-danger border-3 h-100" : "h-100"}
                />
              </InputGroup>
              {categoryErrorMessage && <Form.Label>{categoryErrorMessage}</Form.Label>}

              <Row>
                {categoriesList.map((category) => (
                  <Col xs={6} key={category.id}>
                    <div className="w-100 d-flex align-items-center justify-content-around mt-1 border">
                        <label className="ms-2">{category.name}</label>
                        <Form.Check
                            checked={categories.includes(category.id)}
                            onChange={(event) => {
                                handleSelectedCategories(event.target.checked, category.id)
                            }
                        }/>
                    </div>
                  </Col>
                ))}
              </Row>
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