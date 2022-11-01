import { useState } from "react";

const usePostModal = () => {
  const [isModify, setIsModify] = useState(false);
  const onChangeModify = () => setIsModify((prev) => !prev);

  return { onChangeModify, isModify, setIsModify };
};

export default usePostModal;
