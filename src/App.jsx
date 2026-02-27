import React, { useState, useEffect } from "react";
import Header from "./components/header";
import PostList from "./components/postList";
import CreatePost from "./components/createPost";
import Pagination from "./components/pagination";
import RegistrationForm from "./components/registrationForm";
import { getPosts, createPost, deletePost } from "./services/api";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const postsPerPage = 3;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPosts();

      if (Array.isArray(data)) {
        setPosts(data.reverse());
      } else {
        setError("Invalid data format received from server");
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts. Please try again later.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      const newPost = await createPost(postData);
      await fetchPosts();
      setCurrentPage(1);
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      await fetchPosts();
      const newTotalPages = Math.ceil((posts.length - 1) / postsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  const handleRegisterSuccess = () => {
    alert("Registration successful! You can now create posts.");
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <Header onRegisterClick={() => setShowRegistration(true)} />
      <div className="main-container">
        <div className="content-wrapper">
          {error && (
            <div
              style={{
                padding: "1rem",
                background: "rgba(231, 76, 60, 0.2)",
                borderRadius: "0.5rem",
                color: "#E74C3C",
                fontWeight: "500",
              }}
            >
              {error}
            </div>
          )}
          <PostList
            posts={currentPosts}
            loading={loading}
            onDeletePost={handleDeletePost}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={handleNextPage}
            onPrevious={handlePreviousPage}
          />
        </div>
        <CreatePost onCreatePost={handleCreatePost} />
      </div>

      {showRegistration && (
        <RegistrationForm
          onClose={() => setShowRegistration(false)}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
    </div>
  );
}

export default App;
