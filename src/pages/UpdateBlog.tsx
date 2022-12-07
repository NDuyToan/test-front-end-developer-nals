import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Space, Form, Input, Upload, message, Skeleton } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { AppDispatch, RootState } from "../store";
import type { BlogType } from "../services/data";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitBlog } from "../services/data";
import { getBlogById, createNewBlog, editBlog } from "../store/blog/slice";

import styles from "./UpdateBlog.module.scss";

const UpdateBlog: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { status, blogDetail, isSaving } = useSelector(
    (state: RootState) => state.blog
  );
  const { id } = useParams();

  useEffect(() => {
    id === undefined ? setIsEdit(false) : setIsEdit(true);
  }, [id]);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getBlogById(id))
        .unwrap()
        .then((response: BlogType) => {
          form.setFieldsValue(response);
        })
        .catch((error: string) => {
          message.error(error);
        });
    }
  }, [id, dispatch]);

  const propsImage: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: RcFile) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Image must smaller than 5MB!");
      }

      if (isJpgOrPng && isLt5M) {
        setFileList([file]);
      }

      return false;
    },
    fileList,
  };

  const handleEditBlog = (values: SubmitBlog) => {
    const dataSubmit = {
      title: values.title,
      content: values.content,
      image: fileList[0],
      id,
    };

    dispatch(editBlog(dataSubmit))
      .unwrap()
      .then(() => {
        message.success("Edit blog successfully");
        navigate("/");
      })
      .catch((err: string) => {
        message.error(err);
      });
  };

  const handleCreateNewBlog = (values: SubmitBlog) => {
    const dataSubmit = {
      title: values.title,
      content: values.content,
      image: fileList[0],
    };

    dispatch(createNewBlog(dataSubmit))
      .unwrap()
      .then(() => {
        message.success("Create a new blog successfully");
        navigate("/");
      })
      .catch((err: string) => {
        message.error(err);
      });
  };

  const onReset = () => {
    form.resetFields();
    setFileList([]);
  };

  return (
    <Skeleton loading={status === "loading"}>
      <div className={styles.updateContainer}>
        {!isEdit ? (
          <h2 className={styles.title}> Create new blog</h2>
        ) : (
          <h2 className={styles.title}> Edit blog</h2>
        )}

        <Form
          name="updateBlog"
          layout="vertical"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          onFinish={isEdit ? handleEditBlog : handleCreateNewBlog}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input Title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please input Content!" }]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item
            label="Photo"
            name="image"
            // rules={[{ required: true, message: "Please upload Photo!" }]}
          >
            <Upload
              {...propsImage}
              listType="picture"
              maxCount={1}
              defaultFileList={[...fileList]}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
              <span className={styles.note}>(You can only upload 1 photo)</span>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isSaving}
              >
                Save
              </Button>
              <Button htmlType="button" onClick={onReset} size="large">
                Reset
              </Button>
              <Button
                type="link"
                htmlType="button"
                onClick={() => {
                  navigate("/");
                }}
                size="large"
              >
                Go Back Home
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Skeleton>
  );
};

export default UpdateBlog;
