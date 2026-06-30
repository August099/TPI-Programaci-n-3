import './itemsAdmin.css'
import { useState, useEffect } from 'react';
import { Button, Table, Image } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons"
import { getItems, updateItem, deleteItem, addItem } from '../store.services';
import EditItem from '../../ui/modal/editItem';
import Confirm from '../../ui/modal/confirm';
import CategoriesModal from '../../ui/modal/categories';
import { data } from 'react-router';
import { errorToast, successToast } from '../../ui/notifications/notifications';
import ItemSearch from '../itemSearch/itemSearch';
import TableItem from '../tableItem/TableItem';

const ItemsAdmin = () => {

  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [items, setItems] = useState([])
  const [searchItems, setSearchItems] = useState([])
  const [resultItems, setResultItems] = useState([])
  const [sortBy, setSortBy] = useState("id")
  const [order, setOrder] = useState("desc")
  const [editItem, setEditItem] = useState(null)
  const [actionModal, setActionModal] = useState('')
  const [messageModal, setMessageModal] = useState('')
  const [handleConfirm, setHandleConfirm] = useState(null)
  
  const handleAcceptConfirm = (item) => {
    setActionModal(`Eliminar ${item.name}.`)
    setMessageModal("¿Esta seguro que queres eliminar el producto?")
    setHandleConfirm(() => () => {
      deleteItem(
        item.id,
        (data) => {
          successToast("Producto eliminado correctamente.")
          setItems((prevItems) => 
            prevItems.filter((i) =>
              i.id !== data 
            )
          )
          setSearchItems((prevItems) => 
            prevItems.filter((i) =>
              i.id !== data 
            )
          )
        },
        (err) => console.log(err)
      )
      setShowConfirmModal(false)
    })
    setShowConfirmModal(true)
  }
  
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false)
  }
  
  const handleEditItem = (item) => {
    setEditItem(item)
  }
  
  const handleConfirmEdit = (item) => {
    if (editItem) {
      updateItem(
        item,
        (data) => {
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.id === data.id ? data : item
            )
          )
          setResultItems((prevItems) =>
            sortResults(prevItems.map((item) =>
              item.id === data.id ? data : item
            ), sortBy, order)
          )
          setEditItem(null)
        },
        (err) => console.log(err)
      )
    } else {
      addItem(
        item,
        (data) => {
          setItems((prevItems) =>
            [data, ...prevItems]
          )
          setSearchItems((prevItems) =>
            [data, ...prevItems]
          )
          setEditItem(null)
        }
      )
    }
    
    setShowEditModal(false)
  }

  const handleCloseEditModal = () => {
    setEditItem(null)
    setShowEditModal(false)
  }

  const handleAddItem = () => {
    setShowEditModal(true)
  }

  const handleAdminCategories = () => {
    setShowCategoryModal(true)
  }

  const handleCloseCategoryModal = () => {
    getItems(
      (data) => {
        setItems(data)
        setSearchItems(data)
      },
      (err) => errorToast("Error al cargar los productos")
    )
    setShowCategoryModal(false)
  }

  const catToString = (categories) => {
    return categories.map(c => c.name).join(" - ")
  }

  const sortResults = (itemsList, sortType, order) => {
    const sorted = [...itemsList]
    switch (sortType) {
      case "id":
        if (order === "asc") {
          sorted.sort((a, b) => a.id - b.id)
        } else {
          sorted.sort((a, b) => b.id - a.id)
        }
        break
      case "name":
        if (order === "asc") {
          sorted.sort((a, b) => a.name.localeCompare(b.name))
        } else {
          sorted.sort((a, b) => b.name.localeCompare(a.name))
        }
        break
      case "description":
        if (order === "asc") {
          sorted.sort((a, b) => a.description.localeCompare(b.description))
        } else {
          sorted.sort((a, b) => b.description.localeCompare(a.description))
        }
        break
      case "price":
        if (order === "asc") {
          sorted.sort((a, b) => a.price - b.price)
        } else {
          sorted.sort((a, b) => b.price - a.price)
        }
        break
      case "discount":
        if (order === "asc") {
          sorted.sort((a, b) => a.discount - b.discount)
        } else {
          sorted.sort((a, b) => b.discount - a.discount)
        }
        break
      case "stock":
        if (order === "asc") {
          sorted.sort((a, b) => a.stock - b.stock)
        } else {
          sorted.sort((a, b) => b.stock - a.stock)
        }
        break
      case "category":
        if (order === "asc") {
          sorted.sort((a, b) => catToString(a.categories).localeCompare(catToString(b.categories)))
        } else {
          sorted.sort((a, b) =>  catToString(b.categories).localeCompare(catToString(a.categories)))
        }
        break
      case "available":
        if (order === "asc") {
          sorted.sort((a, b) => a.available - b.available)
        } else {
          sorted.sort((a, b) => b.available - a.available)
        }
        break
      
      default:
        if (order === "asc") {
          sorted.sort((a, b) => a.id - b.id)
        } else {
          sorted.sort((a, b) => b.id - a.id)
        }
        break
    }

    return sorted
  }

  useEffect(() => {
    getItems(
      (data) => {
        setItems(data)
        setSearchItems(data)
      },
      (err) => errorToast("Error al cargar los productos")
    )
  }, [])

  useEffect(() => {
      setResultItems(sortResults(searchItems, sortBy, order))
  }, [searchItems])

  useEffect(() => {
        setResultItems(sortResults(resultItems, sortBy, order))
    }, [sortBy, order])

  useEffect(() => {
    if (editItem) {
      setShowEditModal(true)
    }
  }, [editItem])

  const handleItemSearch = (value) => {
      setSearchItems(
          items.filter((item) =>
              item.name.trim().toLowerCase().includes(value.toLowerCase()),
          )
      )
  }

  const handleSort = (sort, order) => {
    setSortBy(sort)
    setOrder(order)
  }

  return (
    <div className="d-flex flex-column w-100 h-100 p-3" style={{overflowY: "auto", scrollbarWidth: "none"}}>
      <div className='d-flex flex-row-reverse align-items-center justify-content-center mb-2 gap-3'>
        <Button
          onClick={handleAdminCategories}
        >
          Categorias
        </Button>

        <Button
          onClick={handleAddItem}
        >
          Agregar
        </Button>

        <ItemSearch className="w-100 my-3" onFindItem={handleItemSearch}/>
      </div>
      
      <div className='flex-fill rounded-3' style={{backgroundColor: "var(--secondary)", border: "2px solid var(--white)", overflowY: "auto", scrollbarWidth: "none"}}>
        <Table className='tabla-items m-0' style={{"--bs-table-bg": "transparent", "--bs-table-border-color": "var(--white)", "--bs-table-color": "var(--black)", "--bs-table-striped-color": "var(--black)", "--bs-table-hover-color": "var(--black)"}} striped bordered hover>
          <thead>
            <tr>
              <th>
                <TableItem title={"ID"} type={"id"} onSort={handleSort}/>
              </th>
              <th>
                <TableItem title={"Nombre"} type={"name"} onSort={handleSort}/>
              </th>
              <th>
                <TableItem title={"Descripcion"} type={"description"} onSort={handleSort}/>
              </th>

              <th>Imagen</th>

              <th>
                <TableItem title={"Precio"} type={"price"} onSort={handleSort}/>
              </th>
              <th>
                <TableItem title={"Descuento"} type={"discount"} onSort={handleSort}/>
              </th>
              <th>
                <TableItem title={"Stock"} type={"stock"} onSort={handleSort}/>
              </th>
              <th>
                <TableItem title={"Categorias"} type={"category"} onSort={handleSort}/>
              </th>
              <th>
                <TableItem title={"Disponible"} type={"available"} onSort={handleSort}/>
              </th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {resultItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td><span className="title-clamp">{item.name}</span></td>
                <td><span className="description-clamp">{item.description}</span></td>
                <td><Image src={item.image} className='h-100' style={{aspectRatio: "1 / 1"}}/></td>
                <td>${item.price}</td>
                <td>{item.discount * 100}%</td>
                <td>{item.stock}</td>
                <td>{catToString(item.categories)}</td>
                <td>{`${item.available}`}</td>
                <td>
                  <Button 
                    className="border border-0 rounded-3"
                    style={{backgroundColor: "var(--blue)", aspectRatio: "1 / 1"}}
                    onClick={() => handleEditItem(item)}
                  >
                    <PencilSquare size={20}/>
                  </Button>
                </td>
                <td>
                  <Button
                    className="border border-0 rounded-3"
                    style={{backgroundColor: "var(--red)", aspectRatio: "1 / 1"}}
                    onClick={() => handleAcceptConfirm(item)}
                  >
                    <Trash size={20}/>  
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <CategoriesModal show={showCategoryModal} onClose={handleCloseCategoryModal}/>
      <EditItem item={editItem} show={showEditModal} onClose={handleCloseEditModal} onConfirm={handleConfirmEdit}/>
      <Confirm actionTitle={actionModal} message={messageModal} show={showConfirmModal} onClose={handleCloseConfirmModal} onConfirm={handleConfirm} />
    </div>
  );
}

export default ItemsAdmin