import { useState, useContext, useEffect } from "react";
import { KicksContext } from "../../context/KicksContextProvider";
import styles from "./Cart.module.css";

// resources
import cartImg from "../../assets/images/cart.png";
import thanks from "../../assets/images/Thanks.png";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import CustomButton from "../../components/CustomButton";

// notification components
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

const Cart = () => {
  const navigate = useNavigate();
  const goToShop = () => {
    navigate("/upcoming");
  };

  const {
    cartItems,
    setCartItems,
    increaseQuantity,
    reduceQuantity,
    removeFromCart,
    selectedSneaker,
    serviceId,
    emailService,
    templateIdTwo,
  } = useContext(KicksContext);

  // states to control order completion process
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBackClick = () => {
    navigate(`/upcoming/${selectedSneaker.id}`);
  };

  useEffect(() => {
    // generates coupon for customer
    function generateCouponCode() {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      let code = "";

      for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }

      return code;
    }

    const generateNewCouponCode = () => {
      const newCouponCode = generateCouponCode();
      setCouponCode(newCouponCode);
    };

    generateNewCouponCode();
  }, []);

  // functions handling order completion
  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const clearFields = () => {
    setUserEmail("");
    setUserName("");
  };

  const sendEmail = () => {
    const emailParams = {
      name: userName,
      email: userEmail,
      message: generateEmailBody(cartItems),
      couponCode: couponCode,
    };

    emailjs
      .send(serviceId, templateIdTwo, emailParams, emailService)
      .then((response) => {
        setIsSubmitted(true);
        setCartItems([]);

        toast.success(
          <>
            Order Completed
            <br />
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
        console.log("Email sent:", response);
        clearFields();
      })
      .catch((error) => {
        toast.error(
          <>
            Not Completed
            <br />
          </>,
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            style: {
              backgroundColor: "black",
              color: "#fff",
            },
            progressStyle: {
              backgroundColor: "grey",
            },
          }
        );
        console.error("Email error:", error);
      });
  };

  const generateEmailBody = (items) => {
    // Create a formatted list of items
    const itemDetails = items
      .map((item) => {
        const discountedPrice = (
          item.price *
          (1 - item.discount / 100)
        ).toFixed(2);
        return `${item.name}\nPrice: $${item.price}\nQuantity: ${item.quantity}\nSize: ${item.size}\nPicture: ${item.grid_picture_url}\nDiscount: ${item.discount}%\nDiscounted Price: $${discountedPrice}`;
      })
      .join("\n\n");
    const totalPrice = calculateTotalPrice(items);
    // Creating the email body text
    return `My Shopping Cart:\n\n${itemDetails}\n\nClaim your discount with this code:\nCoupon Code: ${couponCode}\n\nTotal Price: $${totalPrice}`;
  };

  // calculating the total
  const calculateTotalPrice = (cartItems) => {
    let totalPrice = 0;

    for (const item of cartItems) {
      // Calculate the price for each item based on its quantity
      const Price = item.price * (1 - item.discount / 100);
      totalPrice += Price;
    }

    return totalPrice.toFixed(2);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ToastContainer />

        <div>
          {cartItems.length !== 0 && (
            <div className={styles.back}>
              <IoMdArrowRoundBack
                className={styles.back}
                style={{
                  fontSize: "3.5vmax",
                  cursor: "pointer",
                }}
                onClick={handleBackClick}
              />
              <h2>Cart</h2>
            </div>
          )}

          {cartItems.length !== 0 && !isSubmitted ? (
            <div>
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index}>
                    <div className={styles.cartList}>
                      <CustomButton
                        containerStyle={styles.remove}
                        buttonText={"Remove"}
                        onClick={() => removeFromCart(item)}
                      />

                      <section className={styles.imgSide}>
                        <img src={item.grid_picture_url} alt="" />
                      </section>

                      <section className={styles.detailSide}>
                        <div>
                          <p className={styles.name}>{item.name}</p>
                          <p className={styles.details}>{item.details}</p>
                          <p className={styles.size}>Size: {item.size}</p>
                        </div>

                        <div className={styles.buttonBox}>
                          <p> Quantity:</p>
                          <CustomButton
                            containerStyle={styles.button}
                            onClick={() => reduceQuantity(item)}
                            buttonText={"-"}
                          />
                          <span className={styles.quantity}>
                            {item.quantity}
                          </span>
                          <CustomButton
                            containerStyle={styles.button}
                            onClick={() => increaseQuantity(item)}
                            buttonText={"+"}
                          />
                        </div>
                      </section>

                      <section className={styles.priceSide}>
                        <p className={styles.message}>
                          Get {item.discount}% off!
                        </p>

                        <div className={styles.priceBox}>
                          <p className={styles.retail}>
                            Retail Price: ${item.price}
                          </p>

                          <p className={styles.discount}>
                            Discounted Price: $
                            {(item.price * (1 - item.discount / 100)).toFixed(
                              2
                            )}
                          </p>
                        </div>
                      </section>
                    </div>
                  </li>
                ))}

                <div className={styles.total}>
                  <h2>Total Price: ${calculateTotalPrice(cartItems)}</h2>
                </div>
              </ul>
            </div>
          ) : isSubmitted ? (
            <div className={styles.thankYou}>
              <img src={thanks} alt="" />
            </div>
          ) : (
            <div className={styles.emptyCart}>
              <img src={cartImg} alt="" />
              <h3>Seems your cart is empty,</h3>
              <p>You are just a few clicks away from great discounts!</p>
              <CustomButton buttonText={"Shop Here"} onClick={goToShop} />
            </div>
          )}
        </div>

        {cartItems.length !== 0 && !isSubmitted && (
          <div className={styles.checkOut}>
            <h3>Enter your details to claim discount</h3>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={userName}
              onInput={handleNameChange}
              name="name"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter a valid email"
              value={userEmail}
              onInput={handleEmailChange}
            />

            <CustomButton onClick={sendEmail} buttonText={"Complete Order"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
