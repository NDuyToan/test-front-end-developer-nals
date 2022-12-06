import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import Card from "../components/Card";
import type { BlogType } from "../services/data";
import { fetchBlogs } from "../store/blog/slice";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  const { blogs, status, error } = useSelector((state: any) => state.blog);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchBlogs()).unwrap();
  }, [dispatch]);

  return (
    <>
      {status === "loading" && <div className={styles.loading}></div>}
      {!error && status !== "loading" && blogs.length === 0 && (
        <div className={styles.noData}>
          <p>No Blog available</p>
          <Button type="primary" size="large">
            Add new blog
          </Button>
        </div>
      )}
      {error && (
        <div className={styles.msgErr}>
          <p>{error}</p>
        </div>
      )}
      {blogs &&
        blogs.length > 0 &&
        blogs?.map((blog: BlogType) => (
          <Card
            key={blog.id}
            id={blog.id}
            title={blog.title}
            desc={blog.content}
            srcImg={blog.image}
          />
        ))}
    </>
  );
};

export default HomePage;
