// import React from 'react';
import styles from "./Cart.module.css";
import { KicksContext } from "../../context/KicksContextProvider";
import { useContext } from "react";

const Cart = () => {
  const { cartItems } = useContext(KicksContext);
  console.log(cartItems);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Cart</h2>
        <div>
          {cartItems.length !== 0 ? (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <p>{item.name}</p>
                  <p>{item.details}</p>
                  <p>{item.price}</p>
                  <img src={item.grid_picture_url} alt="" />
                  <p>{item.size}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <h2>Cart is Empty</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
