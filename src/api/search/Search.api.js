import { customAxios } from "../../lib/axios/customAxios";

export const searchPost = async (keyword) => {
  try {
    const { data } = await customAxios.get(`/post/search/${keyword}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
