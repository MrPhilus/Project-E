/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const KicksContext = createContext();

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
  //shoe sizes in product details
  const [sizes, setSizes] = useState([]);
  //cart
  const [cartItems, setCartItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState(0);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const formattedPriceValue = `$${selectedSneaker.retail_price_cents / 100}`;

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
  };

  return (
    <KicksContext.Provider value={objectsPassed}>
      {children}
    </KicksContext.Provider>
  );
};

export default KicksContextProvider;
