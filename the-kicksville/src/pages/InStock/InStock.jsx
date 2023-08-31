/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import ProductCard from "../../components/NavBar/ProductCard";
import styles from "../InStock/instock.module.css";
import { useState, useEffect } from "react";

const InStock = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideShow = [
    {
      pic: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/163492f2-ec02-4430-aa57-db32039a2b09/air-griffey-max-1-mens-shoes-6q83v3.png",
    },
    {
      pic: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e0a0b38e-cd18-45da-8b7c-fd75d5b65465/air-griffey-max-1-mens-shoes-6q83v3.png",
    },
    {
      pic: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/572a3c3d-8244-4e32-add1-99a080db2a60/air-griffey-max-1-mens-shoes-6q83v3.png",
    },
    {
      pic: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/01238456-7420-4409-ac61-a216ab8a8832/air-griffey-max-1-mens-shoes-6q83v3.png",
    },
    {
      pic: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e48e274f-bb8e-4ed2-be5b-d8728d8453eb/air-griffey-max-1-mens-shoes-6q83v3.png",
    },
    {
      pic: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/aa7bc858-0c35-4328-8faf-f2552638ed40/air-griffey-max-1-mens-shoes-6q83v3.png",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideShow.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.mainContainer}>
      {slideShow.map((item, index) => (
        <div
          className={styles.container}
          key={index}
          style={{ display: index === currentIndex ? "block" : "none" }}
        >
          {/* Pass the sneaker information as props to ProductCard */}
          <ProductCard
            buttonText="Notify Me"
            shoeColor="Pure Platinum/White/University Red"
            shoeName="Nike Air Griffey Max 1"
            imgSrc={item.pic}
            releaseDate="May 2024"
          />
        </div>
      ))}
    </div>
  );
};
export default InStock;
