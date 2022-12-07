import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Pagination, Form, Input, Select, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import type { PaginationProps } from "antd";
import CardBlog from "../components/CardBlog";
import type { BlogType, RequestParams } from "../services/data";
import type { AppDispatch, RootState } from "../store";
import { fetchBlogs } from "../store/blog/slice";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  const TOTAL_BLOGS = 50; // because the api doesn't return the total number of blogs. So I assume that the total is 50;
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 10;
  const { blogs, status, error } = useSelector(
    (state: RootState) => state.blog
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [requestParams, setRequestParams] = useState<RequestParams>({
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
    sortBy: "",
    order: "",
    search: "",
  });
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchBlogs(requestParams)).unwrap();
  }, [dispatch, requestParams]);

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    setRequestParams((prevState: RequestParams) => ({
      ...prevState,
      page: pageNumber,
    }));
  };

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setRequestParams((prevState: RequestParams) => ({
      ...prevState,
      page: current,
      limit: pageSize,
    }));
  };

  const onFilter = (values: RequestParams) => {
    setRequestParams((prevState: RequestParams) => ({
      ...prevState,
      search: values.search?.trim(),
      sortBy: values.order ? "createdAt" : "",
      order: values.order ? values.order : "",
    }));
  };

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
      <section className={styles.filter}>
        <Form
          form={form}
          layout="inline"
          onFinish={onFilter}
          style={{ width: "100%" }}
        >
          <Row style={{ width: "100%" }} gutter={[20, 20]}>
            <Col span={24} md={{ span: 10 }}>
              <Form.Item name="search" style={{ width: "100%" }}>
                <Input placeholder="Enter something to search" />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 10 }}>
              <Form.Item name="order" style={{ width: "100%" }} initialValue="">
                <Select>
                  <Select.Option value="">Not sort</Select.Option>
                  <Select.Option value="asc">
                    Sort by: Date ascending
                  </Select.Option>
                  <Select.Option value="desc">
                    Sort by: Date descending
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 4 }}>
              <Form.Item style={{ width: "100%" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Search
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
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
        {blogs && blogs.length > 0 && (
          <Pagination
            total={TOTAL_BLOGS}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            showSizeChanger
            defaultPageSize={DEFAULT_LIMIT}
            defaultCurrent={DEFAULT_PAGE}
            current={requestParams.page}
            pageSize={requestParams.limit}
          />
        )}
        <div className={styles.note}>
          <h3>Note:</h3>
          <p>
            Vì API không trả về tổng số lượng blog, nên đang để mặc định tổng
            blog là 50. Vì thế nếu click vào các page 4,5 có thể không có dữ
            liệu.
          </p>
        </div>
      </section>
    </>
  );
};

export default HomePage;
