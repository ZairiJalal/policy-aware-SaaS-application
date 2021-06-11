import { faFile,faTrashAlt,faShare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Dropdown ,ButtonGroup} from "react-bootstrap"
import tenants from "../../tenants.json"


export default function File({ file }) {
  const tenant = tenants.find(t=>t.id==localStorage.getItem('tenant'))

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
      <Dropdown.Item href="#">
      <FontAwesomeIcon icon={faFile} className="mr-2" />
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
