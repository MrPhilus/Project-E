/* eslint-disable react/prop-types */
import styles from "./CustomButton.module.css";

const CustomButton = ({ onClick, containerStyle, buttonText }) => {
  return (
    <button
      className={`${styles.button} ${containerStyle && containerStyle}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default CustomButton;
