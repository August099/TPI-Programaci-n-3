import './itemsAdmin.css'
import { useState, useEffect } from 'react';
import { Button, Table } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons"
import EditItem from '../../ui/modal/editItem';
import ConfirmDelete from '../../ui/modal/delete';

const ItemsAdmin = ({items}) => {

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editItem, setEditItem] = useState(null)

  const handleEditItem = (item) => {
    setEditItem(item)
  }

  const handleConfirmEdit = () => {
    console.log("editado")
    setShowEditModal(false)
  }

  const handleConfirmDelete = () => {
    console.log("eliminado")
    setShowDeleteModal(false)
  }

  useEffect(() => {
    if (editItem) {
      setShowEditModal(true)
    }
  }, [editItem])

  return (
    <div className="w-100 h-100 p-3" style={{overflowY: "auto", scrollbarWidth: "none"}}>
      <Table className='tabla-items' style={{"--bs-table-bg": "var(--secondary)"}} striped bordered hover>
        <colgroup>
          <col className='col-id'/>   
          <col className='col-title'/>  
          <col className='col-description'/>  
          <col className='col-price'/>  
          <col className='col-discount'/>  
          <col className='col-image'/>
          <col className='col-available'/>  
          <col className='col-edit'/> 
          <col className='col-delete'/> 
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Image url</th>
            <th>Available</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td><span className="title-clamp">{item.title}</span></td>
                <td><span className="description-clamp">{item.description}</span></td>
                <td>${item.price}</td>
                <td>{item.discount * 100}%</td>
                <td><span className="image-clamp">{item.imageUrl}</span></td>
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
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <Trash size={20}/>  
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <EditItem item={editItem} show={showEditModal} onClose={() => {setShowEditModal(false)}} onConfirm={handleConfirmEdit}/>
      <ConfirmDelete show={showDeleteModal} onClose={() => {setShowDeleteModal(false)}} onConfirm={handleConfirmDelete} />
    </div>
  );
}

export default ItemsAdmin