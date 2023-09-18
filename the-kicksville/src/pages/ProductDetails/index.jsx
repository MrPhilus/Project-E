/* eslint-disable react-hooks/exhaustive-deps */
import CustomButton from "../../components/CustomButton";
import styles from "./ProductDetails.module.css";
import { useNavigate, Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useContext, useEffect } from "react";
import { KicksContext } from "../../context/KicksContextProvider";
import { BiChevronsDown } from "react-icons/bi";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    error,
    setError,
    discount,
    setDiscount,
  } = useContext(KicksContext);

  const handleBackClick = () => {
    navigate(`/upcoming/${selectedSneaker.id}`);
    setError("");
  };

  const handleSizeSelect = (e) => {
    const selectedSizeValue = e.target.textContent;
    setSelectedSize(selectedSizeValue);

    setError("");
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      // Add the selected product to the cart only if a size is selected
      addToCart({
        ...selectedSneaker,
        size: selectedSize,
        price: formattedPriceValue,
        discount: discount,
        quantity: 1,
      });

      setSelectedSize("");
      setError("");

      toast.success(
        <>
          Added to Cart
          <br />
          <Link
            to="/cart"
            style={{ textDecoration: "underline", color: "white" }}
          >
            Go To Cart
          </Link>
        </>,
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          style: {
            backgroundColor: "black",
            color: "#08b50b",
          },
          progressStyle: {
            backgroundColor: "grey",
          },
        }
      );
    } else {
      setError("Select A Size Before Adding To Cart");
    }
  };

  useEffect(() => {
    const sortedSizes = selectedSneaker
      ? selectedSneaker.size_range
          .filter((size) => size >= 5 && size <= 12) // Filter sizes between 5 and 12
          .sort((a, b) => a - b)
      : [];

    setSizes(sortedSizes);
    let shoeDiscount = 0;
    if (selectedSize >= 5 && selectedSize <= 7) {
      shoeDiscount = 15; // Set the discount percentage for this size range
    } else if (selectedSize >= 7.5 && selectedSize <= 9.5) {
      shoeDiscount = 12; // Set the discount percentage for this size range
    } else if (selectedSize >= 10 && selectedSize <= 12) {
      shoeDiscount = 10; // Set the discount percentage for this size range
    }

    setDiscount(shoeDiscount);
  }, [selectedSize]);

  return selectedSneaker ? (
    <div>
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.aside}>
          <div>
            <IoMdArrowRoundBack
              className={styles.back}
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
              <h3 style={{ fontStyle: "italic" }}>{selectedSneaker.details}</h3>
              <h3>${formattedPriceValue}</h3>
              <p>Get {discount}% off!</p>
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
          <div className={styles.sizeBox}>
            {error && <span className={styles.errorMsg}>{error}</span>}
            <details open className={styles.dropDown}>
              <summary>
                <h3>Available Sizes</h3>
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
      </div>

      {/* mobile layout */}
      <div className={styles.mobileContainer}>
        <ToastContainer />
        <div className={styles.asideMobi}>
          <div className={styles.back}>
            <IoMdArrowRoundBack
              className={styles.backArrow}
              onClick={handleBackClick}
            />
          </div>

          <section>
            <h2 style={{ fontSize: "2vmax" }}>{selectedSneaker.name}</h2>
            <h3 style={{ fontSize: "1.6vmax", fontStyle: "italic" }}>
              {selectedSneaker.details}
            </h3>
            <h3 style={{ fontSize: "2vmax" }}>{formattedPriceValue}</h3>
          </section>

          <div></div>
        </div>

        <div className={styles.detailsMobi}>
          <section className={styles.sizeRangeMobi}>
            <div>
              <img
                className={styles.imageMobi}
                src={selectedSneaker.grid_picture_url}
                alt=""
              />

              <div>
                {error && <span className={styles.errorMsg}>{error}</span>}
                <details open className={styles.dropDownMobi}>
                  <summary>
                    <h3>Available Sizes</h3>{" "}
                    <BiChevronsDown
                      className={styles.arrowDownMobi}
                      size={20}
                    />
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
            </div>
          </section>
        </div>

        <div className={styles.storyMobi}>
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
