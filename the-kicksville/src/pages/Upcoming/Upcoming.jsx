// // /* eslint-disable react-hooks/exhaustive-deps */
// // import style from "./upcoming.module.css";
// // import { useEffect, useContext } from "react";
// // import { Link } from "react-router-dom";
// // import { Element } from "react-scroll";
// // import { KicksContext } from "../../context/KicksContextProvider";

// // import apiData from "../../../api.json";
// // import ProductCard from "../../components/ProductCard";

// // const Upcoming = () => {
// //   const {
// //     sneakerData,
// //     setSneakerData,
// //     numProductsToShow,
// //     setNumProductsToShow,
// //     productsToAdd,
// //   } = useContext(KicksContext);

// //   const loadMoreProducts = () => {
// //     setNumProductsToShow(numProductsToShow + productsToAdd);
// //   };

// //   const filterAndSetSneakerData = () => {
// //     const filteredSneakerData = apiData.sneakers
// //       .filter((sneaker) => {
// //         const releaseYear = new Date(sneaker.release_date).getFullYear();
// //         return releaseYear >= 2018;
// //       })
// //       .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
// //       .slice(0, numProductsToShow);

// //     setSneakerData(filteredSneakerData);
// //   };

// //   // Helper function to format the release date
// //   function formatReleaseDate(releaseDate) {
// //     return new Date(releaseDate).toLocaleDateString("en-US", {
// //       month: "long",
// //       day: "numeric",
// //     });
// //   }

// //   function formattedPrice(price) {
// //     return `$${price / 100}`;
// //   }

// //   useEffect(() => {
// //     filterAndSetSneakerData();
// //   }, [numProductsToShow]); // Update whenever numProductsToShow changes

// //   return (
// //     <div className={style.mainContainer}>
// //       <Element name="sneakerList" className={style.sneakerList}>
// //         {sneakerData.length > 0 ? (
// //           sneakerData.map((sneaker, index) => {
// //             const formattedReleaseDate = formatReleaseDate(
// //               sneaker.release_date
// //             );

// //             const formattedPriceValue = formattedPrice(
// //               sneaker.retail_price_cents
// //             );

// //             return (
// //               <div key={index} className={`${style.productCard}`}>
// //                 <Link
// //                   style={{ color: "black" }}
// //                   to={`/details`}
// //                   state={{ sneaker }}
// //                 >
// //                   <ProductCard
// //                     buttonText="Pre-Order"
// //                     shoeColor={sneaker.details}
// //                     price={formattedPriceValue}
// //                     shoeName={sneaker.name}
// //                     imgSrc={sneaker.grid_picture_url}
// //                     releaseDate={formattedReleaseDate}
// //                   />
// //                 </Link>
// //               </div>
// //             );
// //           })
// //         ) : (
// //           <div className={style.loader}>
// //             <span className={style.bar}></span>
// //             <span className={style.bar}></span>
// //             <span className={style.bar}></span>
// //           </div>
// //         )}
// //       </Element>
// //       {numProductsToShow < apiData.sneakers.length && (
// //         <div className={style.loadMoreButton}>
// //           <button onClick={loadMoreProducts}>Load More</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// export default Upcoming;
import style from "./upcoming.module.css";
import { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Element } from "react-scroll";
import { KicksContext } from "../../context/KicksContextProvider";

import apiData from "../../../api.json";
import ProductCard from "../../components/ProductCard";

const Upcoming = () => {
  const {
    sneakerData,
    setSneakerData,
    numProductsToShow,
    setNumProductsToShow,
    productsToAdd,
    setSelectedSneaker,
  } = useContext(KicksContext);

  const { sneakerId } = useParams();

  const filterAndSetSneakerData = () => {
    const filteredSneakerData = apiData.sneakers
      .filter((sneaker) => {
        const releaseYear = new Date(sneaker.release_date).getFullYear();
        return releaseYear >= 2018;
      })
      .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
      .slice(0, numProductsToShow);

    setSneakerData(filteredSneakerData);
    // console.log("hii");
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

  const loadMoreProducts = () => {
    const updatedNumProductsToShow = numProductsToShow + productsToAdd;

    // Store the updated values in sessionStorage
    sessionStorage.setItem("numProductsToShow", updatedNumProductsToShow);
    setNumProductsToShow(updatedNumProductsToShow);
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
  }, [numProductsToShow, sneakerId]); // Update whenever numProductsToShow changes

  return (
    <div className={style.mainContainer}>
      <Element name="sneakerList" className={style.sneakerList}>
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
                className={`${style.productCard}`}
              >
                <Link
                  style={{ color: "black" }}
                  to={`/details/${sneaker.id}`}
                  // state={{ sneaker }}
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
                    shoeColor={sneaker.details}
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
          <div className={style.loader}>
            <span className={style.bar}></span>
            <span className={style.bar}></span>
            <span className={style.bar}></span>
          </div>
        )}
      </Element>
      {numProductsToShow < apiData.sneakers.length && (
        <div className={style.loadMoreButton}>
          <button onClick={loadMoreProducts}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default Upcoming;
