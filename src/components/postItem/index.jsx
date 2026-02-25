import React from "react";
import { formatDate } from "../../utils/dateFormatter";
import styles from "./style.module.css";

const PostItem = ({ post, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDelete(post.id);
    }
  };

  return (
    <div className={styles.postItem}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {post.avatar ? (
              <img src={post.avatar} alt={post.user} />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="#5A6FA8" />
                <path
                  d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21H4V20Z"
                  fill="#5A6FA8"
                />
              </svg>
            )}
          </div>
          <span className={styles.userLabel}>{post.user || "User"}</span>
        </div>
        <div className={styles.postId}>ID: {post.id}</div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.text}>{post.text}</p>
      </div>

      <div className={styles.footer}>
        <span className={styles.postDate}>{formatDate(post.date)}</span>
        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;
