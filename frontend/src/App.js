import React, { useState, useEffect } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const apiUrl = "http://localhost:3001/";
  const [posts, setPosts] = useState([]);

  async function getPosts() {
      try {
        const response = await fetch(`${apiUrl}blogPosts`);
        if (!response.ok) {
          throw new Error("Failed loading posts");
        }
        const blogPosts = await response.json();
        console.log(blogPosts);
        setPosts(blogPosts);
      } catch (error) {
        alert(`Error fetching comments: ` + error);
      }
  };

  useEffect(() => {
    getPosts();
  }, []);


  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home posts={posts}/>} />
        <Route path="/blog/:id" element={<Blog posts={posts}/>} />
        <Route path="/new" element={<NewBlogPost />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
