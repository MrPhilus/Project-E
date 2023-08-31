/* eslint-disable react/prop-types */
// import React from "react";
import style from "./ProductCard.module.css";

const ProductCard = ({
  buttonText,
  shoeColor,
  shoeName,
  imgSrc,
  releaseDate,
}) => {
  return (
    <div className={style.card}>
      <div className={style.cardContent}>
        <p className={style.date}>{releaseDate}</p>
        <img className={style.image} src={imgSrc} alt="" />
        <p className={style.text}>{shoeName}</p>
        <p className={style.color}>{shoeColor}</p>
        <br />
        <button className={style.button}>{buttonText}</button>
      </div>
    </div>
  );
};

export default ProductCard;
