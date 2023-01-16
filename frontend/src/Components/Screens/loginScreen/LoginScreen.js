import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LoginScreen.css";
import MainScreen from "../MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { login} from  '../../../actions/userActions'

import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";
import "./LoginScreen.css";
import {useNavigate} from 'react-router-dom'


 





function LoginScreen({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
    const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
       navigate("/mynotes");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

<br></br>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default LoginScreen;





















// function LoginScreen({ history }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

// const dispatch=useDispatch();

// const userLogin=useSelector((state)=>state.userLogin);

//   const navigate = useNavigate();


//   // useEffect(()=>{

//   //   if (userInfo) {
//   //     navigate("/mynotes");
//   //   }
//   // },[userInfo])



//   const submitHandler = async (e) => {
//     e.preventDefault();
//     console.log(email, password);

//     dispatch(login(email,password))

//   }

//   return (
//     <MainScreen title="Login">
//       <div className="loginContainer">
        
//         <Form onSubmit={submitHandler}>
//           <Form.Group controlId="formBasicEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter email"
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//             />
//           </Form.Group>

//           <Form.Group controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//             />
//           </Form.Group>
//           <br></br>
//           <Button variant="primary" type="submit">
//             Submit
//           </Button>
//         </Form>
//         <br></br>
//         <Row>
//           <Col>
//             New Customer ? <Link to="/register">Register Here</Link>
//           </Col>
//         </Row>
//       </div>
//     </MainScreen>
//   );
// }

// export default LoginScreen;
