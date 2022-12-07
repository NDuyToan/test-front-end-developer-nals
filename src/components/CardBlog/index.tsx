import React from "react";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import type { PropsType } from "../../services/data";
import styles from "./styles.module.scss";
import imgNotAvailable from "../../assets/image/image-not-available.png";

const CardBlog: React.FC<PropsType> = ({ title, srcImg, content, id }) => {
  const navigate = useNavigate();

  const handleEditBlog = () => {
    navigate(`/edit/${id}`);
  };

  const goToDetailBlog = () => {
    navigate(`./detail/${id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardImg}>
          <img
            src={typeof srcImg !== "string" ? imgNotAvailable : srcImg}
            alt=""
          />
        </div>
        <div className={styles.cardText}>
          <h2 onClick={goToDetailBlog}> {title}</h2>
          <p>{content}</p>
        </div>
      </div>
      <div className={styles.actions}>
        <Space>
          <Button type="primary" onClick={() => handleEditBlog()}>
            Edit
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default CardBlog;
