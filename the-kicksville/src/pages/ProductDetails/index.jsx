// import { useContext } from "react";
// import { KicksContext } from "../../context/KicksContextProvider";
import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const { state } = useLocation(); // <-- access route state

  const { sneaker } = state || {}; // <-- unpack the item from state

  console.log(sneaker);
  // const { sneakerData, setSneakerData } = useContext(KicksContext);
  return sneaker ? (
    <div>
      <p>details</p>
      <img src={sneaker.grid_picture_url} alt="" />
      <p>{sneaker.name}</p>
      <p>{sneaker.details}</p>
      <p>{sneaker.story_html}</p>
      {/* <p>{sneaker.size_range}</p> */}
    </div>
  ) : (
    "Not Found"
  );
};

export default ProductDetails;
