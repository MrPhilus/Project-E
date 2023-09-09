/* eslint-disable react/prop-types */
// import React from "react";
import CustomButton from "../CustomButton";
import styles from "./ProductCard.module.css";

const ProductCard = ({ shoeName, imgSrc, releaseDate, price }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
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
      </div>
    </div>
  );
};

export default ProductCard;
