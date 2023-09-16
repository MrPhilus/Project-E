import { useState } from "react";
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

  const { cartItems, increaseQuantity, reduceQuantity, removeFromCart } =
    useContext(KicksContext);

  const [userEmail, setUserEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [userName, setUserName] = useState("");

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
    };

    emailjs
      .send(
        "service_lyoq3gd",
        "template_7a7r6gt",
        emailParams,
        "4a4lIwY4y77e2eMDK"
      )
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
        setIsEmailSent(true);
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
        return `${item.name}\nPrice: ${item.price}\nQuantity: ${item.quantity}\n Picture:${item.grid_picture_url}\n\n`;
      })
      .join("\n");

    // Create the email body text
    return `My Shopping Cart:\n\n${itemDetails}\n
    `;
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ToastContainer />

        <h2>Cart</h2>
        <div>
          {cartItems.length !== 0 ? (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <button onClick={() => removeFromCart(item)}>Remove</button>
                  <p>{item.name}</p>
                  <p>{item.details}</p>
                  <p>{item.price}</p>
                  <img src={item.grid_picture_url} alt="" />
                  <p>{item.size}</p>
                  <p>Get {item.discount}% off!</p>
                  <div>
                    <CustomButton
                      onClick={() => reduceQuantity(item)}
                      buttonText={"-"}
                    />
                    <span>{item.quantity}</span>
                    <CustomButton
                      onClick={() => increaseQuantity(item)}
                      buttonText={"+"}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyCart}>
              <img src={cartImg} alt="" />
              <h3>Seems your cart is empty</h3>
              <p>Take a look around and order something today</p>
              <CustomButton buttonText={"Shop Here"} onClick={goToShop} />
            </div>
          )}
          {cartItems.length !== 0 && (
            <div>
              <p>Enter your details to complete order</p>
              <input
                type="text"
                placeholder="John Doe"
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
              <button onClick={sendEmail}>Complete Order</button>
              {isEmailSent && <p>Email sent successfully!</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
