import CustomButton from "../../components/CustomButton";
import styles from "./ProductDetails.module.css";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useContext, useEffect } from "react";
import { KicksContext } from "../../context/KicksContextProvider";
import { BiChevronsDown } from "react-icons/bi";

const ProductDetails = () => {
  const navigate = useNavigate();
  const {
    selectedSneaker,
    sizes,
    setSizes,
    addToCart,
    selectedSize,
    setSelectedSize,
    formattedPriceValue,
  } = useContext(KicksContext);

  const handleBackClick = () => {
    navigate(`/upcoming/${selectedSneaker.id}`);
  };

  const handleSizeSelect = (e) => {
    const selectedSizeValue = e.target.textContent;
    setSelectedSize(selectedSizeValue);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      // Add the selected product to the cart only if a size is selected
      addToCart({
        ...selectedSneaker,
        size: selectedSize,
        price: formattedPriceValue,
      });

      // You can also navigate to the cart page if needed
      navigate("/cart");
    } else {
      alert("Please select a size before adding to cart.");
    }
  };

  useEffect(() => {
    const sortedSizes = selectedSneaker
      ? selectedSneaker.size_range
          .filter((size) => size >= 5 && size <= 12) // Filter sizes between 5 and 12
          .sort((a, b) => a - b)
      : [];

    setSizes(sortedSizes);
    console.log(sortedSizes);
  }, []);

  return selectedSneaker ? (
    <div>
      <div className={styles.container}>
        <div className={styles.aside}>
          <div>
            <IoMdArrowRoundBack
              style={{
                fontSize: "3.5vmax",
                cursor: "pointer",
              }}
              onClick={handleBackClick}
            />
          </div>
          <section>
            <img
              className={styles.image}
              src={selectedSneaker.grid_picture_url}
              alt=""
            />
          </section>
        </div>
        <div className={styles.details}>
          <section className={styles.story}>
            <div>
              <h2>{selectedSneaker.name}</h2>
              <h3>{selectedSneaker.details}</h3>
              <h3>{formattedPriceValue}</h3>
              <p className={styles.writeUp}>{selectedSneaker.story_html}</p>
              <CustomButton
                containerStyle={styles.button}
                buttonText={"add to cart"}
                onClick={handleAddToCart}
              />
            </div>
          </section>
        </div>
        <div className={styles.sizeRange}>
          <details className={styles.dropDown}>
            <summary>
              <h3>Available Sizes</h3>{" "}
              <BiChevronsDown className={styles.arrowDown} size={20} />
            </summary>
            <ul className={styles.listBox}>
              {sizes.map((size, index) => (
                <CustomButton
                  containerStyle={styles.sizes}
                  key={index}
                  buttonText={size}
                  onClick={handleSizeSelect}
                />
              ))}
            </ul>
          </details>
        </div>
      </div>

      {/* mobile layout */}
      <div className={styles.mobileContainer}>
        <div className={styles.asideMobi}>
          <div>
            <IoMdArrowRoundBack
              styles={{
                fontSize: "3.5vmax",
                cursor: "pointer",
              }}
              onClick={handleBackClick}
            />
          </div>
          <section>
            <h2>{selectedSneaker.name}</h2>
            <h3>{selectedSneaker.details}</h3>
            <h3>{formattedPriceValue}</h3>
          </section>
        </div>

        <div className={styles.detailsMobi}>
          <section className={styles.storyMobi}>
            <div>
              <img
                className={styles.imageMobi}
                src={selectedSneaker.grid_picture_url}
                alt=""
              />

              <details open className={styles.dropDownMobi}>
                <summary>
                  <h3>Available Sizes</h3>{" "}
                  <BiChevronsDown className={styles.arrowDownMobi} size={20} />
                </summary>
                <ul className={styles.listBoxMobi}>
                  {sizes.map((size, index) => (
                    <CustomButton
                      containerStyle={styles.sizesMobi}
                      key={index}
                      buttonText={size}
                      onClick={handleSizeSelect}
                    />
                  ))}
                </ul>
              </details>
            </div>
          </section>
        </div>

        <div className={styles.sizeRangeMobi}>
          <p className={styles.writeUpMobi}>{selectedSneaker.story_html}</p>
          <CustomButton
            containerStyle={styles.buttonMobi}
            buttonText={"add to cart"}
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <CustomButton onClick={handleBackClick} />
      <h2>Not Found</h2>
    </div>
  );
};

export default ProductDetails;
