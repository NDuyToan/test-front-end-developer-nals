import type { BlogType, SubmitBlog } from "./data";
import axios from "axios";
const baseUrl = "https://617b71c2d842cf001711bed9.mockapi.io/api/v1/blogs";

export async function getBlogsAPI(): Promise<BlogType[]> {
  const { data } = await axios.get(baseUrl);
  return data;
}

export async function createBlogAPI(payload: SubmitBlog) {
  await axios.post(baseUrl, payload);
}

export async function editBlogAPI(payload: SubmitBlog) {
  await axios.put(`${baseUrl}/${payload.id}`, payload);
}

export async function getBlogByIdAPI(id: string): Promise<BlogType> {
  const { data } = await axios.get(`${baseUrl}/${id}`);
  return data;
}
