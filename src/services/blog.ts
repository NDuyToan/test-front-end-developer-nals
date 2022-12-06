import type { BlogType } from "./data";
import axios from "axios";
const baseUrl = "https://617b71c2d842cf001711bed9.mockapi.io/api/v1/blogs/";

export async function getBlogs(): Promise<BlogType[]> {
  const { data } = await axios.get(baseUrl);
  return data;
}
