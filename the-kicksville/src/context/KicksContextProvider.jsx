/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

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

  // cart
  const [cartItems, setCartItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState(0);

  // contact form
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  // home page image controls
  const [mainPicIndex, setMainPicIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  const [discount, setDiscount] = useState(0);

  // cart controls
  const addToCart = (itemToAdd) => {
    // Check if the item is already in the cart
    const existingCartItem = cartItems.find(
      (item) => item.id === itemToAdd.id && item.size === itemToAdd.size
    );

    if (existingCartItem) {
      // Increment the quantity of the existing item
      existingCartItem.quantity += 1;
    } else {
      // Add a new item to the cart with a quantity of 1
      setCartItems([
        ...cartItems,
        { ...itemToAdd, quantity: 1, discount: discount },
      ]);
    }
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.id !== itemToRemove.id || item.size !== itemToRemove.size
    );
    setCartItems(updatedCartItems);
  };

  // cart quantity controls
  const increaseQuantity = (item) => {
    item.quantity += 1;
    setCartItems([...cartItems]);
  };

  const reduceQuantity = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setCartItems([...cartItems]);
    }
  };

  // price conversion from cents
  const formattedPriceValue = `$${selectedSneaker.retail_price_cents / 100}`;

  // handling discount

  // all states and variables globally available
  const objectsPassed = {
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
  };

  return (
    <KicksContext.Provider value={objectsPassed}>
      {children}
    </KicksContext.Provider>
  );
};

export default KicksContextProvider;
