import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
/* import posts from "../../../data/posts.json"; */

const BlogList = ({posts}) => {

  return (
    <Row>
      {posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          xs={12}
          md={6}
          lg={4}
          xl={3}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
