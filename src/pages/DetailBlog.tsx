import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getBlogById } from "../store/blog/slice";
import type { AppDispatch, RootState } from "../store";
import type { BlogType } from "../services/data";
import styles from "./DetailBlog.module.scss";
import avatar from "../assets/image/detailLogo.gif";
import imgNotAvailable from "../assets/image/image-not-available.png";

const DetailBlog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const blogDetail: BlogType = useSelector(
    (state: RootState) => state.blog.blogDetail
  );
  const { status, error } = useSelector((state: any) => state.blog);
  const navigate = useNavigate();

  useEffect(() => {
    if (id != null) {
      dispatch(getBlogById(id)).unwrap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.detailBlog}>
      <Skeleton loading={status === "loading"}>
        {!error && (
          <>
            <Button
              type="primary"
              icon={<ArrowLeftOutlined />}
              onClick={() => {
                navigate("/");
              }}
            >
              Back to Home Page
            </Button>
            <div className={styles.title}>
              <img src={avatar} alt="avatar" />
              <h2>{blogDetail.title}</h2>
            </div>
            <div className={styles.content}>
              <div className={styles.img}>
                <img
                  src={
                    typeof blogDetail.image === "string"
                      ? blogDetail.image
                      : imgNotAvailable
                  }
                  alt=""
                />
              </div>
              <p>{blogDetail.content}</p>
            </div>
          </>
        )}

        {error && (
          <div className={styles.msgError}>
            <p>{error}</p>
            <Link to="/">Go to Home Page</Link>
          </div>
        )}
      </Skeleton>
    </div>
  );
};

export default DetailBlog;
