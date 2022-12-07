import type { BlogType, SubmitBlog, RequestParams } from "./data";
import { removeEmptyPropertyObject } from "../utils";
import axios from "axios";
import { BASE_URL } from "../constants";

export async function getBlogsAPI(
  requestParams: RequestParams
): Promise<BlogType[]> {
  const res = await axios.get(BASE_URL, {
    params: {
      ...removeEmptyPropertyObject(requestParams),
    },
  });
  return res.data;
}

export async function createBlogAPI(payload: SubmitBlog) {
  await axios.post(BASE_URL, payload);
}

export async function editBlogAPI(payload: SubmitBlog) {
  await axios.put(`${BASE_URL}/${payload.id}`, payload);
}

export async function getBlogByIdAPI(id: string): Promise<BlogType> {
  const { data } = await axios.get(`${BASE_URL}/${id}`);
  return data;
}
