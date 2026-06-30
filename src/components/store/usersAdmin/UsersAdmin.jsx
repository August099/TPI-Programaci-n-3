
import { useState, useEffect } from 'react';
import { Button, Table, FormSelect} from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons"
import { getUsers, setRole, removeUser, registerUser} from '../store.services';
import CreateUser from '../../ui/modal/createUser';
import Confirm from '../../ui/modal/confirm';
import { data } from 'react-router';
import { errorToast, successToast } from '../../ui/notifications/notifications';
import ItemSearch from '../itemSearch/itemSearch';
import TableItem from '../tableItem/TableItem';

const ItemsAdmin = () => {

  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [users, setUsers] = useState([])
  const [searchUsers, setSearchUsers] = useState([])
  const [resultUsers, setResultUsers] = useState([])
  const [sortBy, setSortBy] = useState("id")
  const [order, setOrder] = useState("desc")
  const [actionModal, setActionModal] = useState('')
  const [messageModal, setMessageModal] = useState('')
  const [handleConfirm, setHandleConfirm] = useState(null)

  const handleSetUserRol = (user, role) => {
    setRole(
      { email: user.email, role },
      (data) => {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === data.id ? { ...u, role: data.role } : u
          )
        )
        setSearchUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === data.id ? { ...u, role: data.role } : u
          )
        )
        successToast("Rol de usuario actualizado correctamente.");
      },
      (err) => errorToast("Error al cambiar el rol.")
    )
  }

  const handleConfirmCreateUser = (user) => {
    registerUser(
      user,
      (data) => {
        setUsers((prevUsers) =>
          [...prevUsers, data]
        )
        setSearchUsers((prevUsers) =>
          [...prevUsers, data]
        )
      },
      (err) => console.log(err)
    )
    
    setShowCreateUserModal(false)
  }

  const handleDeleteUser = (user) => {
    setActionModal(`Eliminar a ${user.name}.`)
    setMessageModal("¿Esta seguro que queres eliminar el usuario?")
    setHandleConfirm(() => () => {
      removeUser(
        user.id,
        (data) => {
          successToast("Usuario eliminado correctamente.")
          setUsers((prevUsers) => 
            prevUsers.filter((u) =>
              u.id !== data 
            )
          )
          setSearchUsers((prevUsers) => 
            prevUsers.filter((u) =>
              u.id !== data 
            )
          )
        },
        (err) => errorToast("Error al eliminar el usuario.")
      )
      setShowConfirmModal(false)
    })
    setShowConfirmModal(true)
  }

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false)
  }

  const handleCloseCreateUserModal = () => {
    setShowCreateUserModal(false)
  }

  const handleCreateUser = () => {
    setShowCreateUserModal(true)
  }

  const sortResults = (usersList, sortType, order) => {
    const sorted = [...usersList]
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
      case "email":
        if (order === "asc") {
          sorted.sort((a, b) => a.email.localeCompare(b.email))
        } else {
          sorted.sort((a, b) => b.email.localeCompare(a.email))
        }
        break
      case "role":
        if (order === "asc") {
          sorted.sort((a, b) => a.role.localeCompare(b.role))
        } else {
          sorted.sort((a, b) => b.role.localeCompare(a.role))
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
    getUsers(
      (data) => {
        setUsers(data)
        setSearchUsers(data)
      },
      (err) => errorToast("Error al obtener los usuarios.")
    )
  }, [])

  useEffect(() => {
      setResultUsers(sortResults(searchUsers, sortBy, order))
  }, [searchUsers])

  useEffect(() => {
      setResultUsers(sortResults(resultUsers, sortBy, order))
  }, [sortBy, order])

  const handleUsersSearch = (value) => {
      setSearchUsers(
          users.filter((user) =>
              user.name.trim().toLowerCase().includes(value.toLowerCase()),
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
          onClick={handleCreateUser}
        >
          Agregar
        </Button>

        <ItemSearch className="w-100 my-3" onFindItem={handleUsersSearch}/>
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
                <TableItem title={"Correo"} type={"email"} onSort={handleSort}/>
              </th>
              <th>
                <TableItem title={"Rol"} type={"role"} onSort={handleSort}/>
              </th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {resultUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <FormSelect
                    style={{backgroundColor: "var(--primary)"}}
                    value={user.role}
                    onChange={(event) => handleSetUserRol(user, event.target.value)}
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Super">Super</option>
                  </FormSelect>
                </td>
                <td>
                  <Button
                    className="border border-0 rounded-3"
                    style={{backgroundColor: "var(--red)", aspectRatio: "1 / 1"}}
                    onClick={() => handleDeleteUser(user)}
                  >
                    <Trash size={20}/>  
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <CreateUser show={showCreateUserModal} onClose={handleCloseCreateUserModal} onConfirm={handleConfirmCreateUser}/>
      <Confirm actionTitle={actionModal} message={messageModal} show={showConfirmModal} onClose={handleCloseConfirmModal} onConfirm={handleConfirm} />
    </div>
  );
}

export default ItemsAdmin