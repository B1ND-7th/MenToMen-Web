import { useRecoilState } from "recoil";
import { buttonState } from "../recoil/modalAtom";

const useControllButton = () => {
  const [buttonStates, setButtonStates] = useRecoilState(buttonState);

  return {
    buttonStates,
  };
};

export default useControllButton;
