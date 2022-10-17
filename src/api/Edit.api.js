import { customAxios } from "../lib/axios/customAxios";

export const EditPost = async (postData) => {
  try {
    if (postData.imgUrls === null) postData.imgUrls = [];
    const { data } = await customAxios.patch("/post/update/", postData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
