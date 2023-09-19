/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./ProductCard.module.css";

// components
import CustomButton from "../CustomButton";
import LoadScreen from "../LoadingScreen";

const ProductCard = ({ shoeName, imgSrc, releaseDate, price }) => {
  const [imageLoad, setImageLoad] = useState(true);

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        {!imageLoad ? (
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
