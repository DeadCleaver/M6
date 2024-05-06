import React from "react";
import { Button, Container, Navbar, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import { useState } from "react";
import LoginModal from "../loginmodal/LoginModal";

const NavBar = (props) => {

  const [userAvatar, setUserAvatar] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const [show, setShow] = useState(false); 

  const toggleLoginModal = () => {
    setShow(!show); 
  };

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img
            className="blog-navbar-brand"
            alt="logo"
            src={logo}
            style={{ width: "100px" }}
          />
        </Navbar.Brand>

        <Dropdown>
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            className="blog-navbar-avatar-button"
          >
            <img
              src={userAvatar}
              alt="Avatar"
              className="blog-navbar-avatar rounded-circle"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={toggleLoginModal}>
              Log in
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/new">
              Nuovo Articolo
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/newauthor">
              Gestione Autori
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <LoginModal show={show} setShow={setShow} />
      </Container>
    </Navbar>
  );
};

export default NavBar;
