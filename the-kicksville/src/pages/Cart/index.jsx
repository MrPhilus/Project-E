import { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import cartImg from "../../assets/images/cart.png";
import { KicksContext } from "../../context/KicksContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomButton from "../../components/CustomButton";
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
  } = useContext(KicksContext);

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [couponCode, setCouponCode] = useState("");

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

  const emailService = import.meta.env.VITE_APP_EMAIL;
  const serviceId = import.meta.env.VITE_SERVICE_ID;
  const templateId = import.meta.env.VITE_TEMPLATE_ID_2;

  const sendEmail = () => {
    generateNewCouponCode();

    const emailParams = {
      name: userName,
      email: userEmail,
      message: generateEmailBody(cartItems),
      couponCode: couponCode,
      contentType: "text/html",
    };

    emailjs
      .send(serviceId, templateId, emailParams, emailService)
      .then((response) => {
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
        return `${item.name}\nPrice: $${item.price}\nQuantity: ${item.quantity}\nPicture: ${item.grid_picture_url}\nDiscount: ${item.discount}%`;
      })
      .join("\n\n");

    // Create the email body text
    return `My Shopping Cart:\n\n${itemDetails}\n\nClaim your discount with this code:\nCoupon Code: ${couponCode}\n`;
  };

  const calculateTotalPrice = (cartItems) => {
    let totalPricePayable = 0;

    for (const item of cartItems) {
      // Calculate the price for each item based on its quantity
      const itemPrice = item.price * (1 - item.discount / 100);
      totalPricePayable += itemPrice;
    }

    return totalPricePayable.toFixed(2);
  };
  // Save cartItems to session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    const storedCartItems = sessionStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ToastContainer />

        <div>
          <h2>Cart</h2>
          {cartItems.length !== 0 ? (
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
                        <span className={styles.quantity}>{item.quantity}</span>
                        <CustomButton
                          containerStyle={styles.button}
                          onClick={() => increaseQuantity(item)}
                          buttonText={"+"}
                        />
                      </div>
                    </section>

                    <section className={styles.priceSide}>
                      <p className={styles.message}>
                        You qualify for {item.discount}% discount on each of
                        this product ordered!
                      </p>
                      <div>
                        <p>Retail Price: ${item.price}</p>
                        <p>
                          Discounted Price: $
                          {(item.price * (1 - item.discount / 100)).toFixed(2)}
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
          ) : (
            <div className={styles.emptyCart}>
              <img src={cartImg} alt="" />
              <h3>Seems your cart is empty,</h3>
              <p>You are just a few clicks away from great discounts!</p>
              <CustomButton buttonText={"Shop Here"} onClick={goToShop} />
            </div>
          )}
        </div>
        {cartItems.length !== 0 && (
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
              placeholder="example@email.com"
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
