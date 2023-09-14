/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const KicksContext = createContext();

// controls for loading more products
const KicksContextProvider = ({ children }) => {
  const initialProductsToShow = 6;
  const productsToAdd = 6;

  //navigation
  const [menuOpen, setMenuOpen] = useState(false);

  //products to display
  const [sneakerData, setSneakerData] = useState([]);
  const [selectedSneaker, setSelectedSneaker] = useState({});
  const [numProductsToShow, setNumProductsToShow] = useState(
    initialProductsToShow
  );

  //products displayed by search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  //product details
  const [sizes, setSizes] = useState([]);
  const [error, setError] = useState("");

  //cart
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

  //adding new items to cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  //price conversion from cents
  const formattedPriceValue = `$${selectedSneaker.retail_price_cents / 100}`;

  // all states and variables globally available
  const objectsPassed = {
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
