import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./style.module.css";

const CreatePost = ({ onCreatePost }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onCreatePost(data);
      reset();
    } catch (error) {
      alert("Error creating post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <div className={styles.avatar}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="#5A6FA8" />
              <path
                d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21H4V20Z"
                fill="#5A6FA8"
              />
            </svg>
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.label}>User</label>
            <input
              type="text"
              placeholder="Enter username..."
              className={`${styles.input} ${errors.user ? styles.inputError : ""}`}
              {...register("user", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Username must not exceed 50 characters",
                },
              })}
            />
            {errors.user && (
              <span className={styles.error}>{errors.user.message}</span>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Post Title</label>
          <input
            type="text"
            placeholder="Enter title..."
            className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
              maxLength: {
                value: 100,
                message: "Title must not exceed 100 characters",
              },
            })}
          />
          {errors.title && (
            <span className={styles.error}>{errors.title.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Post Content</label>
          <textarea
            placeholder="Enter your text..."
            className={`${styles.textarea} ${errors.content ? styles.inputError : ""}`}
            {...register("content", {
              required: "Content is required",
              minLength: {
                value: 10,
                message: "Content must be at least 10 characters",
              },
              maxLength: {
                value: 1000,
                message: "Content must not exceed 1000 characters",
              },
            })}
          />
          {errors.content && (
            <span className={styles.error}>{errors.content.message}</span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
