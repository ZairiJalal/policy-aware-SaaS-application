import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory, useParams } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"
import tenants from "../../tenants.json"
import axios from "axios"
import './Login.css';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const {id}= useParams();  
  const tenant = tenants.find(t=>t.id==id)
  console.log()

  async function handleSubmit(e) {
    e.preventDefault()

    
    const data = {
      username:emailRef.current.value,
      password:passwordRef.current.value,
      idTenant: tenant.id
    }

    axios.post('https://test-saas-mul.herokuapp.com/users',data)
         .then(res=>{console.log(res)})
         .catch(err=>{console.log(err)})
    

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value+"@gmail.com", passwordRef.current.value)
      history.push("/"+tenant.id+"/login")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  if(tenant){
    if(tenant.oauth2){
      return (
          <div className="login-container">
          <div className="login-content">
              <h1 className="login-title">Sign up </h1>
              <div className="social-login">
          <a className="btn btn-block social-btn google" href="/">
              <img src={googleLogo} alt="Google" /> Sign up with Google</a>
          <a className="btn btn-block social-btn facebook" href="/">
              <img src={fbLogo} alt="Facebook" /> Sign up with Facebook</a>
          <a className="btn btn-block social-btn github" href="/">
              <img src={githubLogo} alt="Github" /> Sign up with Github</a>
      </div>
              
          </div>
          <div className="w-100 text-center mt-2">
        Already have an account? <Link to={"/"+tenant.id+"/login"}>Log In</Link>
      </div>
      </div>
      
      )
    }
    if(!tenant.oauth2){
    
  return (
    <CenteredContainer>
      <h2>{tenant.id}</h2>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className={"w-100 btn btn-"+tenant.color} type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to={"/"+tenant.id+"/login"}>Log In</Link>
      </div>
    </CenteredContainer>
  )}
  }
  return (
   

<div class="page-wrap d-flex flex-row align-items-center">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 text-center">
                <span class="display-1 d-block">404</span>
                <div class="mb-4 lead">The page you are looking for was not found.</div>
            </div>
        </div>
    </div>
</div>
  )

}
