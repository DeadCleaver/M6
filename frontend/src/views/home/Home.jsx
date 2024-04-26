import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";

const Home = ({ posts }) => {
  return (
    <Container fluid="sm">
      <Container fluid className="border border-success rounded blog-main-container mt-3 mb-5 shadow">
        <h1 className="blog-main-title text-center my-3">
          Benvenuto sullo Strive Blog!
        </h1>
      </Container>
      <BlogList posts={posts} />
    </Container>
  );
};

export default Home;
