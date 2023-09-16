/* eslint-disable react/prop-types */
import CustomButton from "../CustomButton";
import styles from "./ProductCard.module.css";
import LoadScreen from "../LoadingScreen";
import { useContext } from "react";
import { KicksContext } from "../../context/KicksContextProvider";

const ProductCard = ({ shoeName, imgSrc, releaseDate, price }) => {
  const { imageLoading } = useContext(KicksContext);
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        {!imageLoading ? (
          <div className={styles.loadingScreen}>
            <LoadScreen />
          </div>
        ) : (
          <>
            <p className={styles.date}>{releaseDate}</p>

            <img className={styles.image} src={imgSrc} alt="" />

            <p className={styles.text}>{shoeName}</p>
            <div className={styles.bottom}>
              <span className={styles.price}>{price}</span>
              <CustomButton
                containerStyle={styles.button}
                buttonText={"Pre-Order"}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
