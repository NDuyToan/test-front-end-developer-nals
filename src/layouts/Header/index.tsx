import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerLogo}>Blog</div>
          <ul className={styles.headerMenu}>
            <li className={styles.headerMenuItem}>
              <Link className={styles.headerMenuLink} to="/">
                Home
              </Link>
            </li>
            <li className={styles.headerMenuItem}>
              <Link className={styles.headerMenuLink} to="/">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
