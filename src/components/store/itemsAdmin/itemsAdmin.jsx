import './itemsAdmin.css'
import { useState, useEffect } from 'react';
import { Button, Table } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons"
import { getItems, updateItem, deleteItem, addItem } from '../store.services';
import EditItem from '../../ui/modal/editItem';
import ConfirmDelete from '../../ui/modal/delete';
import { data } from 'react-router';
import ItemSearch from '../itemSearch/itemSearch';

const ItemsAdmin = () => {

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [items, setItems] = useState([])
  const [editItem, setEditItem] = useState(null)
  const [deleteItemId, setDeleteItemId] = useState(null)

  const handleEditItem = (item) => {
    setEditItem(item)
  }

  const handleConfirmEdit = (item) => {
    updateItem(
      item,
      (data) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === data.id ? data : item
          )
        )
        setEditItem(null)
      },
      (err) => console.log(err)
    )
    setShowEditModal(false)
  }

  const handleDeleteItem = (item) => {
    setDeleteItemId(item.id)
  }

  const handleConfirmDelete = (id) => {
    deleteItem(
      deleteItemId,
      (data) => {
        setItems((prevItems) =>
          prevItems.filter((item) => item.id !== data)
        )
        setDeleteItemId(null)
      },
      (err) => console.log("Error al eliminar", err)
    )
    setShowDeleteModal(false)
  }

  const handleCloseEditModal = () => {
    setEditItem(null)
    setShowEditModal(false)
  }

  const handleCloseDeleteModal = () => {
    setDeleteItemId(null)
    setShowDeleteModal(false)
  }

  const handleAddItem = () => {

  }

  const handleItemSearch = (value) => {
        setSearchItems(
            items.filter((item) =>
                item.name.trim().toLowerCase().includes(value.toLowerCase()),
            )
        );
    };

  useEffect(() => {
    getItems(
      (data) => setItems(data),
      (err) => console.log(err)
    )
  }, [])

  useEffect(() => {
    if (editItem) {
      setShowEditModal(true)
    }
  }, [editItem])

  useEffect(() => {
    if (deleteItemId) {
      setShowDeleteModal(true)
    }
  }, [deleteItemId])

  return (
    <div className="w-100 h-100 p-3" style={{overflowY: "auto", scrollbarWidth: "none"}}>
      <div className='d-flex gap-3'>
        <Button
        onClick={handleAddItem}
        >
          Agregar
        </Button>
        <ItemSearch onFindItem={handleItemSearch}/>
      </div>
      
      <Table className='tabla-items' style={{"--bs-table-bg": "var(--secondary)"}} striped bordered hover>
        <colgroup>
          <col className='col-id'/>   
          <col className='col-title'/>  
          <col className='col-description'/>  
          <col className='col-image'/>
          <col className='col-price'/>  
          <col className='col-discount'/>
          <col className='col-stock'/>  
          <col className='col-categories'/>  
          <col className='col-available'/>  
          <col className='col-edit'/> 
          <col className='col-delete'/> 
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image url</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Stock</th>
            <th>Categories</th>
            <th>Available</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td><span className="title-clamp">{item.name}</span></td>
                <td><span className="description-clamp">{item.description}</span></td>
                <td><span className="image-clamp">{item.image}</span></td>
                <td>${item.price}</td>
                <td>{item.discount * 100}%</td>
                <td>{item.stock}</td>
                <td>{item.categories.map(c => c.name).join(" - ")}</td>
                <td>{`${item.available}`}</td>
                <td>
                  <Button 
                    className="w-100 h-100 border border-0 rounded-0"
                    style={{backgroundColor: "var(--blue)"}}
                    onClick={() => handleEditItem(item)}
                  >
                    <PencilSquare size={20}/>
                  </Button>
                </td>
                <td>
                  <Button
                    className="w-100 h-100 border border-0 rounded-0"
                    style={{backgroundColor: "var(--red)"}}
                    onClick={() => handleDeleteItem(item)}
                  >
                    <Trash size={20}/>  
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <EditItem item={editItem} show={showEditModal} onClose={handleCloseEditModal} onConfirm={handleConfirmEdit}/>
      <ConfirmDelete show={showDeleteModal} onClose={handleCloseDeleteModal} onConfirm={handleConfirmDelete} />
    </div>
  );
}

export default ItemsAdmin