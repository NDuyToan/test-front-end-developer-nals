import React from "react";
import { Button, Space } from "antd";
import styles from "./styles.module.scss";

interface PropsType {
  title: string;
  srcImg: string;
  desc: string;
  id: string;
}

const Card: React.FC<PropsType> = ({ title, srcImg, desc, id }) => {
  const handleEditBlog = () => {
    console.log("edit", id);
  };
  const handleDeleteBlog = () => {
    console.log("delete", id);
  };
  return (
    <div className={styles.card}>
      <div className={styles.cardImg}>
        <img src={srcImg} alt="" />
      </div>
      <div className={styles.cardContent}>
        <h2> {title}</h2>
        <p>{desc}</p>
      </div>
      <div className={styles.actions}>
        <Space>
          <Button type="primary" onClick={() => handleEditBlog()}>
            Edit
          </Button>
          <Button type="primary" danger onClick={handleDeleteBlog}>
            Delete
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Card;
