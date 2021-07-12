import React, {useRef, useState } from "react"
import { Link } from "react-router-dom"
import {  Dropdown ,ButtonGroup,Container,Button,Modal,Form} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder,faTrashAlt,faShare } from "@fortawesome/free-solid-svg-icons"
import tenants from "../../tenants.json"
import { database } from "../../firebase"



export default function Folder({ folder }) {
  const tenant = tenants.find(t=>t.id==localStorage.getItem('tenant'))

  const [showRename, setShowRename] = useState(false);
  const handleCloseRename = () => setShowRename(false);
  const handleShowRename = () => setShowRename(true);
  const renameRef = useRef();

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

   async function del(e) {
    e.preventDefault()
    database.folders.doc(folder.id).delete()
    handleCloseDelete()
  }
  async function ren(e) {
    e.preventDefault()
    database.folders.doc(folder.id).update({'name':renameRef.current.value})
    handleCloseRename()
  }

  return (
    <Dropdown as={ButtonGroup}>
    <Button
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      }}
      variant={"outline-"+tenant.color}
      className="text-truncate w-100"
      as={Link}
    >
      <FontAwesomeIcon icon={faFolder} className="mr-2" />
      {folder.name}
    </Button>
  
    <Dropdown.Toggle split variant={"outline-"+tenant.color} id="dropdown-split-basic" />
  
    <Dropdown.Menu>
      <Dropdown.Item onClick={handleShowRename} href="#">
      <FontAwesomeIcon icon={faFolder} className="mr-2" />
        Rename
      </Dropdown.Item>
      <Dropdown.Item onClick={handleShowDelete} href="#">
        <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
        Delete
      </Dropdown.Item>
    </Dropdown.Menu>
     <Modal show={showRename} onHide={handleCloseRename}>
        <Modal.Header closeButton>
          <Modal.Title>Rename</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form.Control type="text" ref={renameRef} required />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRename}>
            Close
          </Button>
          <Button variant="primary" onClick={ren}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
       <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           Do you really want to delete ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="primary" onClick={del}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
  </Dropdown>
  )
}
