import React, { useEffect, useContext } from "react";
import { Button, Container, Navbar, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import { useState } from "react";
import LoginModal from "../loginmodal/LoginModal";
import { UserContext } from "../../context/UserContextProvider";

const NavBar = (props) => {

  const staticAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const [show, setShow] = useState(false); 
  const [userData, setUserData] = useState({});
  /* const token = localStorage.getItem('token'); */
  const { userToken, setUserToken } = useContext(UserContext);


  const toggleLoginModal = () => {
    setShow(!show); 
  };

  const userLogin = async () => {

    if (userToken) {
      const response = await fetch('http://localhost:3001/authors/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log('Informazioni utente:', data);
        setUserData(data);
        console.log(userData);
      } else {
        console.error('Errore nel recupero delle informazioni dell\'utente');
      }
    }
  }

  useEffect(() => {
    if (userToken) {
      userLogin();
    }
  }, [userToken]);

  const handleLogout = () => {
    setUserToken("");
    localStorage.removeItem('token');  
    setUserData({});
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
              src={userData?.avatar ? userData.avatar : staticAvatar}
              alt="Avatar"
              className="blog-navbar-avatar rounded-circle"
              style={{ width: "40px", height: "40px" }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={userToken ? handleLogout : toggleLoginModal}>
              {userToken ? `Log Out` : `Log In`}
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/new" disabled={!userToken}>
              Nuovo Articolo
            </Dropdown.Item>
            {/* vecchio pulsante per accesso pannello admin */}
            {/* <Dropdown.Item as={Link} to="/newauthor" disabled={!userToken}>
              Gestione Autori
            </Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
        <LoginModal show={show} setShow={setShow} userLogin={userLogin} />
      </Container>
    </Navbar>
  );
};

export default NavBar;
