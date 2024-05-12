import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogAuthor = props => {
  const { name, lastname, avatar } = props;
  return (
    <Row>
      <Col xs={"auto"} className="pe-0">
        <Image className="blog-author" src={avatar} roundedCircle />
      </Col>
      <Col>
        <div>di</div>
        <h6>{name} {lastname}</h6>
      </Col>
    </Row>
  );
};

export default BlogAuthor;
