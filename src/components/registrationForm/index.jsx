import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  checkUsernameExists,
  checkEmailExists,
  registerUser,
} from "../../services/userApi";
import styles from "./style.module.css";

const RegistrationForm = ({ onClose, onRegisterSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isValidating },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  // Асинхронная проверка username - НЕ должен существовать
  const validateUsername = async (value) => {
    try {
      const exists = await checkUsernameExists(value);
      return !exists || "Username already exists";
    } catch (error) {
      return "Error checking username";
    }
  };

  // Асинхронная проверка email - НЕ должен существовать
  const validateEmail = async (value) => {
    try {
      const exists = await checkEmailExists(value);
      return !exists || "Email already exists";
    } catch (error) {
      return "Error checking email";
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const newUser = await registerUser(data);

      alert("Registration successful! You can now create posts.");
      reset();
      onRegisterSuccess(newUser);
      onClose();
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.title}>Registration</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Username */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Username *</label>
            <input
              type="text"
              className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
              placeholder="Enter username..."
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 4,
                  message: "Username must be at least 4 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username must not exceed 20 characters",
                },
                pattern: {
                  value: /^[A-Za-z0-9_]+$/,
                  message: "Only letters, numbers and underscore allowed",
                },
                validate: validateUsername,
              })}
            />
            {errors.username && (
              <span className={styles.error}>{errors.username.message}</span>
            )}
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Email *</label>
            <input
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              placeholder="Enter email..."
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format",
                },
                validate: validateEmail,
              })}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          {/* First Name */}
          <div className={styles.formGroup}>
            <label className={styles.label}>First Name *</label>
            <input
              type="text"
              className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
              placeholder="Enter first name..."
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
                pattern: {
                  value: /^[A-Za-zА-Яа-яЁё]+$/,
                  message: "Only letters allowed",
                },
              })}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName.message}</span>
            )}
          </div>

          {/* Last Name */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Last Name *</label>
            <input
              type="text"
              className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
              placeholder="Enter last name..."
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
                pattern: {
                  value: /^[A-Za-zА-Яа-яЁё]+$/,
                  message: "Only letters allowed",
                },
              })}
            />
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName.message}</span>
            )}
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Password *</label>
            <input
              type="password"
              className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              placeholder="Enter password..."
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/,
                  message:
                    "Password must contain at least one uppercase letter and one number",
                },
              })}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm Password *</label>
            <input
              type="password"
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
              placeholder="Confirm password..."
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <span className={styles.error}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Age */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Age *</label>
            <input
              type="number"
              className={`${styles.input} ${errors.age ? styles.inputError : ""}`}
              placeholder="Enter age..."
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 18,
                  message: "You must be at least 18 years old",
                },
                max: {
                  value: 100,
                  message: "Age must not exceed 100",
                },
              })}
            />
            {errors.age && (
              <span className={styles.error}>{errors.age.message}</span>
            )}
          </div>

          {/* Phone */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone *</label>
            <input
              type="tel"
              className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
              placeholder="+65XXXXXX XX-XX"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^\+65\d{6}\s\d{2}-\d{2}$/,
                  message: "Phone must be in format: +65XXXXXX XX-XX",
                },
              })}
            />
            {errors.phone && (
              <span className={styles.error}>{errors.phone.message}</span>
            )}
          </div>

          {/* Agree to Terms */}
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                {...register("agreeToTerms", {
                  required: "You must agree to the terms",
                })}
              />
              <span>I agree to the terms and conditions *</span>
            </label>
            {errors.agreeToTerms && (
              <span className={styles.error}>
                {errors.agreeToTerms.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
