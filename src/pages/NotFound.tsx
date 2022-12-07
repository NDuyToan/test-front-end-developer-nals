import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <h2>Nothing to see here!</h2>
      <Link to="/">Go to the home page</Link>
    </div>
  );
};

export default NotFound;
