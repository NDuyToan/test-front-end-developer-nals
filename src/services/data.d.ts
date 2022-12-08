import type { UploadFile } from "antd/es/upload/interface";

export type BlogType = {
  content: string;
  createdAt: string;
  id: string;
  image: string;
  title: string;
};

export type SubmitBlog = {
  title: string;
  content: string;
  image: UploadFile;
  id?: string;
};

export type PropsType = {
  title: string;
  srcImg: string;
  content: string;
  id: string;
};

export type RequestParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
  search?: string;
};
