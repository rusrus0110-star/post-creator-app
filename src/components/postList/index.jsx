import React from "react";
import PostItem from "../postItem";
import styles from "./style.module.css";

const PostList = ({ posts, loading, onDeletePost }) => {
  if (loading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Post List</h2>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Post List</h2>
      <div className={styles.postList}>
        {posts.length === 0 ? (
          <div className={styles.emptyState}>
            No posts yet. Create your first post!
          </div>
        ) : (
          posts.map((post) => (
            <PostItem key={post.id} post={post} onDelete={onDeletePost} />
          ))
        )}
      </div>
    </div>
  );
};

export default PostList;
