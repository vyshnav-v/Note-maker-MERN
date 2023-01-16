import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {logout} from '../actions/userActions'

import {Link} from 'react-router-dom'

function Header({ setSearch }) {
 
 const navigate = useNavigate();
const dispatch = useDispatch();

const userLogin = useSelector((state) => state.userLogin);
const { userInfo } = userLogin;

const logoutHandler = () => {
  dispatch(logout());
  navigate('/login')
};

useEffect(() => {}, [userInfo]);



  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Link to="/">
          <Navbar.Brand>Note Zipper</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          <Nav>
            <>
              <Link to="mynotes">
                <Nav.Link>My Notes</Nav.Link>
              </Link>
              <NavDropdown title={userInfo?userInfo.name:"login"} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/profile">
                  {/* <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    /> */}
                  My Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}
              >Logout</NavDropdown.Item>
              </NavDropdown>
            </>

        
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
