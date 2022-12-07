import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import logo from "../../assets/image/logo_white.png";

const Header: React.FC = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerLogo}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <ul className={styles.headerMenu}>
            <li className={styles.headerMenuItem}>
              <Link className={styles.headerMenuLink} to="/">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
