import { customAxios } from "../../lib/axios/customAxios";

export const searchPost = async (keyword) => {
  try {
    const { data } = await customAxios.post("/post/search", { keyword });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
