import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./RegisterScreen.css";
import MainScreen from "../MainScreen";
import ErrorMessage from "../../ErrorMessage";
import Loading from "../../Loading";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../actions/userActions"; 

import {useNavigate} from 'react-router-dom'







function RegisterScreen() {
   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
 

   const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;




 const postDetails = (pics) => {
      if (!pics) {
        return setPicMessage("Please Select an Image");
      }

      setPicMessage(null);

      if(pics.type==='image/jpeg'|| pics.type==='image/png'){

          const data=new FormData();
          data.append('file',pics)
          data.append('upload_preset','noteZipper')
          data.append('cloud_name','dugese6g6')

          fetch("https://api.cloudinary.com/v1_1/dugese6g6/image/upload",{
              method:'post',
              body:data,
          }).then((res)=>res.json()).then((data)=>{
              console.log(data)
              setPic(data.url.toString())
          }).catch((err)=>{
              console.log(err);
          })
        }

      else{
          return setPicMessage('plz select an image')
      }
    
   
    }
useEffect(() => {
  if (userInfo) {
    navigate("/login");
  }
}, [userInfo]);

const submitHandler = async (e) => {
  e.preventDefault();
  console.log(email);

  if (password !== confirmpassword) {
    setMessage("Passwords do not match");
  } else dispatch(register(name, email, password, pic));
};

  return (
    <MainScreen title="REGISTER">
      <div>
        <div className="loginContainer">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          {loading && <Loading />}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}

            {
              <Form.Group controlId="pic" className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  size="lg"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </Form.Group>
            }

            <br></br>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              Have an Account ? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </div>
      </div>
    </MainScreen>
  );
};
  

           
          
export default RegisterScreen