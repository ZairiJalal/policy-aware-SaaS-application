import { faFile,faTrashAlt,faShare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, {useRef, useState } from "react"
import { Dropdown ,ButtonGroup,Container,Button,Modal,Form} from "react-bootstrap"
import tenants from "../../tenants.json"
import { database } from "../../firebase"




export default function File({ file }) {
  const tenant = tenants.find(t=>t.id==localStorage.getItem('tenant'))

  const [showRename, setShowRename] = useState(false);
  const handleCloseRename = () => setShowRename(false);
  const handleShowRename = () => setShowRename(true);
  const renameRef = useRef();

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [showShere, setShowShere] = useState(false);
  const handleCloseShere = () => setShowShere(false);
  const handleShowShere = () => setShowShere(true);

  async function del(e) {
    e.preventDefault()
    database.files.doc(file.id).delete()
    handleCloseDelete()
  }
  async function ren(e) {
    e.preventDefault()
    database.files.doc(file.id).update({'name':renameRef.current.value})
    handleCloseRename()
  }

 if(!tenant.accesControl || localStorage.getItem('roles').includes("share")){
    return (
    
    <Dropdown as={ButtonGroup}>
    <a
      href={file.url}
      target="_blank"
      className={"btn btn-outline-"+tenant.color+" text-truncate w-100"}
    >
      <FontAwesomeIcon icon={faFile} className="mr-2" />
      {file.name}
    </a>
  
    <Dropdown.Toggle split variant={"outline-"+tenant.color} />
  
    <Dropdown.Menu>
      <Dropdown.Item onClick={handleShowRename} href="#">
      <FontAwesomeIcon  icon={faFile} className="mr-2" />
        Rename
    </Dropdown.Item>
      <Dropdown.Item onClick={handleShowDelete}  href="#">
        <FontAwesomeIcon  icon={faTrashAlt} className="mr-2" />
        Delete
      </Dropdown.Item>
      <Dropdown.Item onClick={handleShowShere} href="#"> 
        <FontAwesomeIcon icon={faShare} className="mr-2" />
        share
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
      <Modal show={showShere} onHide={handleCloseShere}>
        <Modal.Header closeButton>
          <Modal.Title>Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           {file.url}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseShere}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseShere}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
  </Dropdown>
  
  )}
   return (
    
    <Dropdown as={ButtonGroup}>
    <a
      href={file.url}
      target="_blank"
      className={"btn btn-outline-"+tenant.color+" text-truncate w-100"}
    >
      <FontAwesomeIcon icon={faFile} className="mr-2" />
      {file.name}
    </a>
  
    <Dropdown.Toggle split variant={"outline-"+tenant.color} />
  
    <Dropdown.Menu>
      <Dropdown.Item onClick={handleShowRename} href="#">
      <FontAwesomeIcon  icon={faFile} className="mr-2" />
        Rename
    </Dropdown.Item>
      <Dropdown.Item onClick={handleShowDelete}  href="#">
        <FontAwesomeIcon  icon={faTrashAlt} className="mr-2" />
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
      <Modal show={showShere} onHide={handleCloseShere}>
        <Modal.Header closeButton>
          <Modal.Title>Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           {file.url}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseShere}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseShere}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
  </Dropdown>
   )
}
