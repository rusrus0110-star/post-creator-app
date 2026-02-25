import React from "react";
import styles from "./style.module.css";
import logo from "../../assets/images/logo.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="MECK Logo" />
        </div>
        <nav className={styles.nav}>
          <button className={styles.navButton}>Home</button>
          <button className={styles.navButton}>Music</button>
          <button className={styles.navButton}>Community</button>
          <button className={styles.navButton}>Friends</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
