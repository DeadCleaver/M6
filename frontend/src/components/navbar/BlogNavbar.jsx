import React from "react";
import { Button, Container, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
const NavBar = (props) => {
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

        <div className="d-flex">
          <Button
            as={Link}
            to="/new"
            className="blog-navbar-add-button bg-dark text-center me-1"
            size="sm"
          >
            Nuovo Articolo
          </Button>
          <Button
            as={Link}
            to="/newauthor"
            className="blog-navbar-add-button bg-dark text-center"
            size="sm"
          >
            Gestione Autori
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
