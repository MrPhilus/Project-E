/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const KicksContext = createContext();

const KicksContextProvider = ({ children }) => {
  const initialProductsToShow = 6;
  const productsToAdd = 6;

  const [sneakerData, setSneakerData] = useState([]);
  const [selectedSneaker, setSelectedSneaker] = useState({});
  const [sizes, setSizes] = useState([]);
  const [numProductsToShow, setNumProductsToShow] = useState(
    initialProductsToShow
  );

  const objectsPassed = {
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
  };

  return (
    <KicksContext.Provider value={objectsPassed}>
      {children}
    </KicksContext.Provider>
  );
};

export default KicksContextProvider;
