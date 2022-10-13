import { useState } from "react";

const usePostModal = () => {
  const [isModify, setIsModify] = useState(false);
  const onChangeModify = () => setIsModify((prev) => !prev);
  // const request = async() => {
  //     try {
  //         const {data} = await
  //     } catch(error) {
  //         console.log(error)
  //     }
  // }
  return { onChangeModify, isModify };
};

export default usePostModal;
