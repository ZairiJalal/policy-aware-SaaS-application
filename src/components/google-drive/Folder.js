import React from "react"
import { Link } from "react-router-dom"
import { Button,Dropdown ,ButtonGroup} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder,faTrashAlt,faShare } from "@fortawesome/free-solid-svg-icons"
import tenants from "../../tenants.json"


export default function Folder({ folder }) {
  const tenant = tenants.find(t=>t.id==localStorage.getItem('tenant'))

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
      <Dropdown.Item href="#">
      <FontAwesomeIcon icon={faFolder} className="mr-2" />
        Rename
      </Dropdown.Item>
      <Dropdown.Item href="#">
        <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
        Delete
      </Dropdown.Item>
      <Dropdown.Item href="#">
        <FontAwesomeIcon icon={faShare} className="mr-2" />
        share
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  )
}
