import { customAxios } from "../../lib/axios/customAxios";

const commentApi = async (postId) => {
  const { data } = await customAxios.get(`/api/comment/read/${postId}`);
  return data;
};

export default commentApi;
