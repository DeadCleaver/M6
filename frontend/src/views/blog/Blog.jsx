import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
/* import posts from "../../data/posts.json";*/
import "./styles.css";
import CommentsArea from "../../components/comments-area/CommentsArea";

const Blog = ({ posts }) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const { id } = params;
    const blog = posts.find((post) => post._id.toString() === id);

    if (blog) {
      setBlog(blog);
      setLoading(false);

    } else {
      /* navigate("/404"); */
      alert("Blog post Rimosso o non presente")
    }
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Row>
            <Col xs={12} md={8}>
              <Image className="blog-details-cover" src={blog.cover} fluid />
              <h1 className="blog-details-title">{blog.title}</h1>

              <div className="blog-details-container">
                <div className="blog-details-author">
                  <BlogAuthor {...blog.author} />
                </div>
                <div className="blog-details-info">
                  <div>{blog.createdAt}</div>
                  <div>{`lettura da ${blog.readingtime.value} ${blog.readingtime.unit}`}</div>
                  <div
                    style={{
                      marginTop: 20,
                    }}
                  >
                    <BlogLike defaultLikes={["123"]} onChange={console.log} />
                  </div>
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html: blog.content,
                }}
              ></div>
            </Col>
            <Col xs={12} md={4}>
              <CommentsArea comments={blog.comments} blogId={blog._id} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default Blog;
