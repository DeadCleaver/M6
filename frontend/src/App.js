import React, { useState, useEffect } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import NewAuthor from "./views/newauthor/NewAuthor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const apiUrl = "http://localhost:3001/";
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState([]);

  const getPosts = async () => {
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

  const getAuthors = async () => {
    try {
      const response = await fetch(`${apiUrl}authors`);

      if (!response.ok) {
        throw new Error("Failed loading authors");
      }

      const authorsData = await response.json();
      setAuthors(authorsData);
    } catch (error) {
      alert(`Error fetching authors: ` + error);
    }
  };

  useEffect(() => {
    getPosts();
    getAuthors();
  }, []);

  useEffect(() => {
    getPosts();
  }, [posts]);


  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home posts={posts}/>} />
        <Route path="/blog/:id" element={<Blog posts={posts}/>} />
        <Route path="/new" element={<NewBlogPost authors={authors}/>} />
        <Route path="/newauthor" element={<NewAuthor authors={authors} getAuthors={getAuthors}/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
