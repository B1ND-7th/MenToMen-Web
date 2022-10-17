import { customAxios } from "../../lib/axios/customAxios";

export const tagPost = async (tag) => {
  try {
    const { data } = await customAxios.get(`/post/read-all/${tag}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
