import React from "react";
import { Container, Button } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { Link } from "react-router-dom";

const Home = ({ posts }) => {
  return (
    <Container fluid="sm">
      <Container fluid className="border border-success rounded blog-main-container mt-3 mb-5 shadow">
        <h1 className="blog-main-title text-center my-3">
          Benvenuto sullo Strive Blog!
        </h1>
        <Container className="my-3 text-center">
          <p className="m-1">Non sei registrato?</p>
        <Button
            as={Link}
            to="/register"
            className="bg-dark text-center"
            size="sm"
          >
            Registrati!
          </Button>
        </Container>
      </Container>
      <BlogList posts={posts} />
    </Container>
  );
};

export default Home;
