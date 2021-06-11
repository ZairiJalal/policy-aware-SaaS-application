import React, { useState } from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import tenants from "../../tenants.json"


export default function NavbarComponent() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const tenant = tenants.find(t=>t.id==localStorage.getItem('tenant'))


  async function handleLogout() {
    setError("")
    const l = localStorage.getItem('tenant')
    localStorage.removeItem('username')
    localStorage.removeItem('tenant')
    try {
      await logout()
      history.push("/"+l+"/login")
    } catch {
      setError("Failed to log out")
    }
  }
  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand as={Link} to="/">
      {localStorage.getItem("tenant")}
      </Navbar.Brand>
      <Nav>
      <Nav.Link >
      {localStorage.getItem("username")}
        </Nav.Link>
        <Nav.Link  onClick={handleLogout} >
         Log Out
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}
