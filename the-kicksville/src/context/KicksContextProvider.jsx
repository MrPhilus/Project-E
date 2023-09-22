/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const KicksContext = createContext();

// controls for loading more products
const KicksContextProvider = ({ children }) => {
  const initialProductsToShow = 6;
  const productsToAdd = 6;

  // mobile navigation
  const [menuOpen, setMenuOpen] = useState(false);

  // products to display
  const [sneakerData, setSneakerData] = useState([]);
  const [selectedSneaker, setSelectedSneaker] = useState({});
  const [numProductsToShow, setNumProductsToShow] = useState(
    initialProductsToShow
  );

  // products displayed by search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  // product details
  const [sizes, setSizes] = useState([]);
  const [error, setError] = useState("");

  // contact form
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  // home page image controls
  const [mainPicIndex, setMainPicIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // cart
  const [cartItems, setCartItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState(0);
  const [discount, setDiscount] = useState(0);

  // // cart controls
  // const addToCart = (itemToAdd) => {
  //   // Check if the item is already in the cart
  //   const existingCartItem = cartItems.find(
  //     (item) => item.id === itemToAdd.id && item.size === itemToAdd.size
  //   );

  //   if (existingCartItem) {
  //     // Increment the quantity of the existing item
  //     existingCartItem.quantity += 1;
  //     setCartItems([...cartItems]);
  //   } else {
  //     // Add a new item to the cart with a quantity of 1
  //     setCartItems([
  //       ...cartItems,
  //       { ...itemToAdd, quantity: 1, discount: discount },
  //     ]);
  //   }
  //   console.log(cartItems);
  //   sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  // };

  // const removeFromCart = (itemToRemove) => {
  //   const updatedCartItems = cartItems.filter(
  //     //checking if id and sizes are same before removing
  //     (item) => item.id !== itemToRemove.id || item.size !== itemToRemove.size
  //   );
  //   setCartItems(updatedCartItems);
  //   sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  // };

  // useEffect(() => {
  //   // Load cartItems from sessionStorage and parse it as JSON
  //   const storedCartItems = sessionStorage.getItem("cartItems");
  //   if (storedCartItems) {
  //     setCartItems(JSON.parse(storedCartItems));
  //   }
  // }, []);

  // cart controls
  const addToCart = (itemToAdd) => {
    // Check if the item is already in the cart
    const existingCartItem = cartItems.find(
      (item) => item.id === itemToAdd.id && item.size === itemToAdd.size
    );

    if (existingCartItem) {
      // Increment the quantity of the existing item
      setCartItems((prevCartItems) => {
        const updatedCartItems = prevCartItems.map((item) =>
          item.id === itemToAdd.id && item.size === itemToAdd.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        return updatedCartItems;
      });
    } else {
      // Add a new item to the cart with a quantity of 1
      setCartItems((prevCartItems) => {
        const updatedCartItems = [
          ...prevCartItems,
          { ...itemToAdd, quantity: 1, discount: discount },
        ];
        sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        return updatedCartItems;
      });
    }
  };

  const removeFromCart = (itemToRemove) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => item.id !== itemToRemove.id || item.size !== itemToRemove.size
      );
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  useEffect(() => {
    // Load cartItems from sessionStorage and parse it as JSON
    const storedCartItems = sessionStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // cart quantity controls
  const increaseQuantity = (item) => {
    item.quantity += 1;
    item.price += formattedPriceValue;
    setCartItems([...cartItems]);
  };

  const reduceQuantity = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      item.price -= formattedPriceValue;
      setCartItems([...cartItems]);
    }
  };

  // price conversion from cents
  const formattedPriceValue = parseFloat(
    selectedSneaker.retail_price_cents / 100
  );

  // env keys
  const emailService = import.meta.env.VITE_APP_EMAIL;
  const serviceId = import.meta.env.VITE_SERVICE_ID;
  const templateId = import.meta.env.VITE_TEMPLATE_ID_1;
  const templateIdTwo = import.meta.env.VITE_TEMPLATE_ID_2;

  // all states and variables globally available
  const objectsPassed = {
    emailService,
    serviceId,
    templateId,
    templateIdTwo,
    discount,
    setDiscount,
    menuOpen,
    setMenuOpen,
    sneakerData,
    setSneakerData,
    numProductsToShow,
    setNumProductsToShow,
    initialProductsToShow,
    productsToAdd,
    selectedSneaker,
    setSelectedSneaker,
    sizes,
    setSizes,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    reduceQuantity,
    selectedSize,
    setSelectedSize,
    formattedPriceValue,
    error,
    setError,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    input,
    setInput,
    mainPicIndex,
    setMainPicIndex,
    imageLoading,
    setImageLoading,
    handleImageLoad,
  };

  return (
    <KicksContext.Provider value={objectsPassed}>
      {children}
    </KicksContext.Provider>
  );
};

export default KicksContextProvider;
