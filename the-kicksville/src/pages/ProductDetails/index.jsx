import CustomButton from "../../components/CustomButton";
import style from "./ProductDetails.module.css";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useContext } from "react";
import { KicksContext } from "../../context/KicksContextProvider";
import { BiChevronsDown } from "react-icons/bi";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { selectedSneaker } = useContext(KicksContext);

  const handleBackClick = () => {
    navigate(`/upcoming/${selectedSneaker.id}`);
  };

  function formattedPrice(price) {
    return `$${price / 100}`;
  }

  const formattedPriceValue = formattedPrice(
    selectedSneaker.retail_price_cents
  );

  const sortedSizes = selectedSneaker.size_range.sort((a, b) => a - b);

  return selectedSneaker ? (
    <div className={style.container}>
      <div className={style.aside}>
        <div className={style.icon}>
          <IoMdArrowRoundBack
            style={{
              fontSize: "3.5rem",
              cursor: "pointer",
            }}
            onClick={handleBackClick}
          />
        </div>
        <section>
          <img
            className={style.image}
            src={selectedSneaker.grid_picture_url}
            alt=""
          />
        </section>
      </div>

      <div className={style.details}>
        <section className={style.story}>
          <div>
            <h2>{selectedSneaker.name}</h2>
            <h3>{selectedSneaker.details}</h3>
            <h3>{formattedPriceValue}</h3>
            <p className={style.writeUp}>{selectedSneaker.story_html}</p>
            <CustomButton
              containerStyle={style.button}
              buttonText={"add to cart"}
            />
          </div>
        </section>
      </div>

      <div className={style.sizeRange}>
        <details className={style.dropDown}>
          <summary>
            <h3>Available Sizes</h3>{" "}
            <BiChevronsDown className={style.arrowDown} size={20} />
          </summary>
          <ul className={style.listBox}>
            {sortedSizes.map((size, index) => (
              <CustomButton
                containerStyle={style.sizes}
                key={index}
                buttonText={size}
              />
            ))}
          </ul>
        </details>
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
