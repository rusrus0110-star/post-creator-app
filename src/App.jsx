import "./App.css";
import Header from "./components/header";
import React, { useState, useEffect } from "react";
import PostList from "./components/postList";
import CreatePost from "./components/createPost";
import Pagination from "./components/pagination";
import { getPosts, createPost, deletePost } from "./services/api";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const postsPerPage = 3;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data.reverse()); // Show newest first
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      await createPost(postData);
      await fetchPosts();
      setCurrentPage(1); // Go to first page to see new post
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      await fetchPosts();
      // Adjust page if current page becomes empty
      const newTotalPages = Math.ceil((posts.length - 1) / postsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Get current posts
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
      <Header />
      <div className="main-container">
        <div className="content-wrapper">
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
    </div>
  );
}

export default App;
