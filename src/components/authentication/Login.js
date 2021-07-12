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
import GoogleLogin from 'react-google-login'




export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { id }= useParams() 
  const tenant = tenants.find(t=>t.id==id)
  const responseGoogle=(response)=>{
    console.log(response);
    console.log(response.profileObj);
    hhh(response.profileObj.email,response.profileObj.email);
    }

    async function hhh(x,y) {
      const params = new URLSearchParams()
      params.append('username', x)
      params.append('password', y)
      params.append('idTenant', tenant.id)
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      
      try {
        setError("")
        setLoading(true)
        await login(x, y)
        axios.post('https://test-saas-mul.herokuapp.com/login',params, config)
           .then(res=>{
             
            localStorage.setItem('token',res.data.Access_Token)
            localStorage.setItem('username',x)
            localStorage.setItem('tenant',tenant.id)
        history.push("/")
            })
           .catch(err=>{setError("Failed to log in")})
           
      } catch {
        setError("Failed to log in")
      }
    
  
      setLoading(false)
    }

    async function handleSubmit(e) {
      e.preventDefault()
      const params = new URLSearchParams()
      params.append('username', emailRef.current.value)
      params.append('password', passwordRef.current.value)
      params.append('idTenant', tenant.id)
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      
      try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value+"@gmail.com", passwordRef.current.value)
        axios.post('https://test-saas-mul.herokuapp.com/login',params, config)
           .then(res=>{
            console.log(res.data)

             const base64Url = res.data.Access_Token.split('.')[1];
             const base64 = base64Url.replace('-', '+').replace('_', '/');
             
            localStorage.setItem('token',res.data.Access_Token)
            if(emailRef.current.value == "user2")
            localStorage.setItem('roles',["share"])

            localStorage.setItem('roles',[])

            localStorage.setItem('username',emailRef.current.value)
            localStorage.setItem('tenant',tenant.id)
        history.push("/")
            })
           .catch(err=>{setError("Failed to log in")})
           
      } catch {
        setError("Failed to log in")
      }
    
  
      setLoading(false)
    }
  if(tenant){
    if(tenant.oauth2){
      return (
          <div className="login-container">
            
          <div className="login-content">
              <h1 className="login-title">Log in</h1>
              <div className="social-login">
              <GoogleLogin
        clientId="977770901138-9esobjvbo07smtbj3ikq20alc7b912ln.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      
        >Log in with Google </GoogleLogin>
          
          <a className="btn btn-block social-btn facebook" href="/">
              <img src={fbLogo} alt="Facebook" /> Log in with Facebook</a>
          <a className="btn btn-block social-btn github" href="/">
              <img src={githubLogo} alt="Github" /> Log in with Github</a>
      </div>
     
              
          </div>
          <div className="w-100 text-center mt-2">
          Need an account? <Link to={"/"+tenant.id+"/signup"}>Sign Up</Link>
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
            <h2 className="text-center mb-4">Log In</h2>
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
              <Button disabled={loading} className={"w-100 btn btn-"+tenant.color} type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to={"/"+tenant.id+"/signup"}>Sign Up</Link>
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
