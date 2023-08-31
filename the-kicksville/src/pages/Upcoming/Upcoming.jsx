import styles from "./upcoming.module.css";
import { useEffect, useState } from "react";
import apiData from "../../../api.json";
import ProductCard from "../../components/NavBar/ProductCard";

const Upcoming = () => {
  const [sneakerData, setSneakerData] = useState([]);

  useEffect(() => {
    if (apiData.sneakers && apiData.sneakers.length > 0) {
      const filteredSneakerData = apiData.sneakers
        .filter((sneaker) => {
          const releaseYear = new Date(sneaker.release_date).getFullYear();
          return releaseYear >= 2018;
        })
        .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
        .slice(0, 9);
      console.log(filteredSneakerData);
      setSneakerData(filteredSneakerData);
    }
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.sneakerList}>
        {sneakerData.length > 0 ? (
          sneakerData.map((sneaker, index) => (
            <ProductCard
              key={index}
              buttonText="Notify Me"
              shoeColor={sneaker.details}
              shoeName={sneaker.name}
              imgSrc={sneaker.grid_picture_url}
              releaseDate={new Date(sneaker.release_date).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                }
              )}
            />
          ))
        ) : (
          <div className={styles.loader}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upcoming;
