import { Button, Form, Modal, InputGroup, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getCategories, addCategory, updateCategory, removeCategory } from '../../store/store.services.js';
import { errorToast, successToast } from '../notifications/notifications.js';
import { PencilSquare, Trash, X } from "react-bootstrap-icons"

const CategoriesModal = ({show, onClose}) => {
    const [categoriesList, setCategoriesList] = useState([])
    const [newCategory, setNewCategory] = useState("")
    const [editCategory, setEditCategory] = useState(null)

    const [categoryErrorMessage, setCategoryErrorMessage] = useState(null);

    useEffect(() => {
        getCategories(
            (data) => setCategoriesList(data),
            (err) => console.log("Error al obtener las categorias")
        )
    }, [])

    useEffect(() => {
        setNewCategory("")

        if (show) {
            getCategories(
                (data) => setCategoriesList(data),
                (err) => console.log("Error al obtener las categorias")
            )
        }
    }, [show])

    const handleAddCategory = () => {
        if (!newCategory.length || categoriesList.map(c => c.name).includes(newCategory)) {
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

    const handleEditCategory = () => {
        if (!newCategory.length || categoriesList.map(c => c.name).includes(newCategory)) {
            setCategoryErrorMessage("Categoria existente.")
            return
        }

        updateCategory(
            {id: editCategory.id, name: newCategory},
            (data) => {
                setCategoriesList((prevCategories) =>
                    prevCategories.map((c) =>
                        c.id === data.id ? data : c
                    )
                )
                setEditCategory(null)
                setNewCategory("")
            },
            (err) => errorToast("Error al actualizar la categoria.")
        )
    }

    const handleRemoveCategory = (category) => {
        removeCategory(
            category.id,
            (data) => {
                setCategoriesList((prevCategories) => 
                    prevCategories.filter((c) => {
                        return c.id !== parseInt(data)
                    })
                )
                successToast("Categoria eliminada correctamente.")
            },
            (err) => errorToast("Error al eliminar la categoria.")
        )
    }

    return (
        <Modal show={show} onHide={onClose} backdrop="static" scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Administrar categorias</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{scrollbarWidth: "none"}}>
                <Form>
                    <Form.Group className="mb-3">
                            
                        <InputGroup className='my-2' style={{height: "30px"}}>
                            <Button
                                className='h-100 p-0 px-2'
                                onClick={editCategory ? handleEditCategory : handleAddCategory}
                            >
                                {editCategory ? "Editar" : "Agregar"}
                            </Button>
                            <Form.Control
                                type='text'
                                placeholder={editCategory ? "Editar categoria" : 'Agregar categoria'}
                                value={newCategory}
                                onChange={(event) => {setNewCategory(event.target.value), setCategoryErrorMessage(null)}}
                                className={categoryErrorMessage ? 
                                    "border border-danger border-3 h-100" : 
                                    editCategory ? "border border-primary border-3 h-100" : "h-100"}
                            />
                        </InputGroup>
                        {categoryErrorMessage && <Form.Label>{categoryErrorMessage}</Form.Label>}

                        <Row>
                            {categoriesList.map((category) => (
                                <Col xs={6} key={category.id}>
                                    <div className={
                                        editCategory?.name === category.name ? 
                                            "w-100 d-flex align-items-center justify-content-between mt-1 border border-primary border-3" :
                                            "w-100 d-flex align-items-center justify-content-between mt-1 border"}
                                        >
                                        <label className="ms-2">{category.name}</label>
                                        
                                        {(editCategory && editCategory?.name === category.name) ? 
                                            <Button
                                                onClick={() => setEditCategory(null)}
                                                className='p-1 bg-transparent border-0'
                                            >
                                                <X style={{color: "var(--modal)"}} size={15}/>
                                            </Button> :
                                            <div className='d-flex'>
                                                <Button
                                                    onClick={() => {setEditCategory(category), setNewCategory(category.name)}}
                                                    className='p-1 bg-transparent border-0'
                                                >
                                                    <PencilSquare style={{color: "var(--modal)"}} size={15}/>
                                                </Button>

                                                <Button
                                                    onClick={() => handleRemoveCategory(category)}
                                                    className='p-1 bg-transparent border-0'
                                                >
                                                    <Trash style={{color: "var(--modal)"}} size={15}/>
                                                </Button>
                                            </div>
                                        }
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
            </Modal.Footer>
        </Modal>
    )
}

export default CategoriesModal