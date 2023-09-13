/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./upcoming.module.css";
import { useEffect, useContext, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import photo from "../../assets/images/ooppps.png";
import { KicksContext } from "../../context/KicksContextProvider";

import apiData from "../../../api.json";
import ProductCard from "../../components/ProductCard";
import CustomButton from "../../components/CustomButton";
import LoadScreen from "../../components/LoadingScreen";

const Upcoming = () => {
  const {
    sneakerData,
    setSneakerData,
    numProductsToShow,
    setNumProductsToShow,
    productsToAdd,
    setSelectedSneaker,
    searchQuery,
    sortBy,
    setSortBy,
  } = useContext(KicksContext);

  const [itemsFound, setItemsFound] = useState(true);
  const { sneakerId } = useParams();
  const navigate = useNavigate();

  const filterAndSetSneakerData = () => {
    let filteredSneakerData = apiData.sneakers.filter((sneaker) => {
      const releaseYear = new Date(sneaker.release_date).getFullYear();
      return (
        releaseYear >= 2018 &&
        sneaker.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    if (filteredSneakerData.length === 0) {
      // No items found
      setItemsFound(false);
    } else {
      // Items found
      setItemsFound(true);
    }

    if (sortBy === "date") {
      filteredSneakerData = filteredSneakerData.sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date)
      );
    } else if (sortBy === "price") {
      filteredSneakerData = filteredSneakerData.sort(
        (a, b) => a.retail_price_cents - b.retail_price_cents
      );
    } else {
      // Default sorting by date
      filteredSneakerData = filteredSneakerData.sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date)
      );
    }

    filteredSneakerData = filteredSneakerData.slice(0, numProductsToShow);
    setSneakerData(filteredSneakerData);
  };

  // Helper function to format the release date
  function formatReleaseDate(releaseDate) {
    return new Date(releaseDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  }

  function formattedPrice(price) {
    return `$${price / 100}`;
  }

  const resetRoute = () => {
    navigate("/upcoming"); // Navigate to the "Upcoming" route
    setSelectedSneaker(""); // Clear the selected sneaker ID
  };

  const loadMoreProducts = () => {
    const updatedNumProductsToShow = numProductsToShow + productsToAdd;

    // Store the updated values in sessionStorage
    sessionStorage.setItem("numProductsToShow", updatedNumProductsToShow);
    setNumProductsToShow(updatedNumProductsToShow);

    resetRoute();
  };

  useEffect(() => {
    const element = document.getElementById(`sneaker-${sneakerId}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    // Check sessionStorage for existing numProductsToShow
    const storedNumProductsToShow = sessionStorage.getItem("numProductsToShow");

    if (storedNumProductsToShow) {
      // Parse the stored value to an integer
      const parsedNumProductsToShow = parseInt(storedNumProductsToShow, 10);
      setNumProductsToShow(parsedNumProductsToShow);
    } else {
      // If not found in sessionStorage, use the initial value
      setNumProductsToShow(6);
    }

    filterAndSetSneakerData();
  }, [numProductsToShow, sneakerId, searchQuery, sortBy]);

  return (
    <div className={styles.mainContainer}>
      {itemsFound ? (
        <>
          <section className={styles.filterBox}>
            <label>Sort by:</label>
            <div className={styles.buttonContainer}>
              <CustomButton
                buttonText={"Date"}
                onClick={() => setSortBy("date")}
              />
              <CustomButton
                buttonText={"Price"}
                onClick={() => setSortBy("price")}
              />
            </div>
          </section>

          <div name="sneakerList" className={styles.sneakerList}>
            {sneakerData.length > 0 ? (
              sneakerData.map((sneaker, index) => {
                const formattedReleaseDate = formatReleaseDate(
                  sneaker.release_date
                );
                const formattedPriceValue = formattedPrice(
                  sneaker.retail_price_cents
                );

                return (
                  <div
                    key={index}
                    id={`sneaker-${sneaker.id}`}
                    className={`${styles.productCard}`}
                  >
                    <Link
                      style={{ color: "black" }}
                      to={`/details/${sneaker.id}`}
                      onClick={() => {
                        sessionStorage.setItem(
                          "shoeState",
                          JSON.stringify(sneaker)
                        );
                        setSelectedSneaker(sneaker);
                      }}
                    >
                      <ProductCard
                        buttonText="Pre-Order"
                        price={formattedPriceValue}
                        shoeName={sneaker.name}
                        imgSrc={sneaker.grid_picture_url}
                        releaseDate={formattedReleaseDate}
                      />
                    </Link>
                  </div>
                );
              })
            ) : (
              <LoadScreen />
            )}
          </div>
          {numProductsToShow < apiData.sneakers.length && (
            <div className={styles.loadMoreButton}>
              <CustomButton
                onClick={loadMoreProducts}
                buttonText={"Load More"}
              />
            </div>
          )}
        </>
      ) : (
        <div>
          <img src={photo} alt="" />
          <h2>No results match your search.</h2>
        </div>
      )}
    </div>
  );
};

export default Upcoming;
