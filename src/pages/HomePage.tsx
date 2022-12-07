import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import CardBlog from "../components/CardBlog";
import type { BlogType } from "../services/data";
import type { AppDispatch, RootState } from "../store";
import { fetchBlogs } from "../store/blog/slice";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  const { blogs, status, error } = useSelector(
    (state: RootState) => state.blog
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBlogs()).unwrap();
  }, [dispatch]);

  return (
    <>
      <section className={styles.addNewBlog}>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            navigate("/create");
          }}
        >
          Add new Blog
        </Button>
      </section>
      {/* list of blog */}
      <section>
        {status === "loading" && blogs.length === 0 && (
          <div className={styles.loading}></div>
        )}
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
            <CardBlog
              key={blog.id}
              id={blog.id}
              title={blog.title}
              content={blog.content}
              srcImg={blog.image}
            />
          ))}
      </section>
    </>
  );
};

export default HomePage;
