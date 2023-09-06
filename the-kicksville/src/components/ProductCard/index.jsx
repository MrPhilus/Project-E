/* eslint-disable react/prop-types */
// import React from "react";
import CustomButton from "../CustomButton";
import style from "./ProductCard.module.css";

const ProductCard = ({ shoeColor, shoeName, imgSrc, releaseDate, price }) => {
  return (
    <div className={style.card}>
      <div className={style.cardContent}>
        <p className={style.date}>{releaseDate}</p>
        <img className={style.image} src={imgSrc} alt="" />
        <p className={style.text}>{shoeName}</p>
        <p className={style.color}>{shoeColor}</p>
        <div className={style.bottom}>
          <span className={style.price}>{price}</span>
          <CustomButton
            containerStyle={style.button}
            buttonText={"Pre-Order"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
