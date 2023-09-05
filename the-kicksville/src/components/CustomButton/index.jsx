/* eslint-disable react/prop-types */
import style from "./CustomButton.module.css";

const CustomButton = ({ onClick, containerStyle, buttonText }) => {
  return (
    <button
      className={`${style.button} ${containerStyle && containerStyle}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default CustomButton;
