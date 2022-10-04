import React from "react";
import { useRecoilState } from "recoil";
import { tagAtom } from "../../recoil/uploadAtom";
import "./Select.css";
import { PLATFORM } from "../../constants/Platform/PLANTFORM";

const Select = () => {
  const [select, setSelect] = useRecoilState(tagAtom);

  return (
    <div>
      <div className="SelectBox">
        <div>
          {PLATFORM.map((item) => (
            <button
              style={{
                border: `1px solid ${item.color}`,
                backgroundColor: select === item.name && item.color,
                color: select !== item.name ? item.color : "white",
              }}
              className="DesignBt"
              onClick={() => setSelect(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
