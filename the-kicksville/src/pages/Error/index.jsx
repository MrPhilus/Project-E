import error from "../../assets/images/ooppps.png";
import styles from "./Error.module.css";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <img src={error} alt="Error" />
      <h3>ERROR 404 - Page Not Found</h3>
      <CustomButton onClick={goToHome} buttonText={"Back to home"} />
    </div>
  );
};

export default Error;
