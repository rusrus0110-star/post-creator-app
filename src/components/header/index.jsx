import React from "react";
import logo from "../../assets/images/logo.svg";
import styles from "./style.module.css";

const Header = ({ onRegisterClick, currentUser, onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="MECK Logo" className={styles.logoImage} />
        </div>

        <nav className={styles.nav}>
          <a href="#home" className={styles.navLink}>
            Home
          </a>
          <a href="#music" className={styles.navLink}>
            Music
          </a>
          <a href="#community" className={styles.navLink}>
            Community
          </a>
          <a href="#friends" className={styles.navLink}>
            Friends
          </a>
        </nav>

        <div className={styles.authSection}>
          {currentUser ? (
            <div className={styles.userInfo}>
              <span className={styles.username}>
                Hello, {currentUser.username}
              </span>
              <button onClick={onLogout} className={styles.logoutButton}>
                Logout
              </button>
            </div>
          ) : (
            <button onClick={onRegisterClick} className={styles.registerButton}>
              Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
