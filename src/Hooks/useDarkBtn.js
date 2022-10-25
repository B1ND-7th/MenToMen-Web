import { useRecoilState } from "recoil";
import { buttonState } from "../recoil/modalAtom";

const useControllButton = () => {
  const [buttonStates, setButtonStates] = useRecoilState(buttonState);

  const toggleUserClick = () => {
    setButtonStates({
      isUserClick: !buttonStates.isUserClick,
      menuClick: false,
      isServiceCenterClick: false,
    });
  };

  const toggleMenuClick = () => {
    setButtonStates({
      ...buttonStates,
      isMenuClick: !buttonStates.isMenuClick,
    });
  };

  return {
    toggleUserClick,
    buttonStates,
    toggleMenuClick,
  };
};

export default useControllButton;
