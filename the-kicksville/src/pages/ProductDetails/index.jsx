import CustomButton from "../../components/CustomButton";
import style from "./ProductDetails.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); //  access route state
  const { sneaker } = state || {}; //  unpack the item from state

  console.log(sneaker);
  // const { sneakerData, setSneakerData } = useContext(KicksContext);

  const handleBackClick = () => {
    navigate("/upcoming"); // Navigate back to /upcoming
  };

  function formattedPrice(price) {
    return `$${price / 100}`;
  }
  const formattedPriceValue = formattedPrice(sneaker.retail_price_cents);
  const sortedSizes = sneaker.size_range.sort((a, b) => a - b);

  return sneaker ? (
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
          <img className={style.image} src={sneaker.grid_picture_url} alt="" />
        </section>
      </div>

      <div className={style.details}>
        <section className={style.story}>
          <div>
            <h2>{sneaker.name}</h2>
            <h3>{sneaker.details}</h3>
            <h4>{formattedPriceValue}</h4>
            <p className={style.writeUp}>{sneaker.story_html}</p>
            <CustomButton
              containerStyle={style.button}
              buttonText={"add to cart"}
            />
          </div>

          <div className={style.sizeRange}>
            <h3>Available Sizes:</h3>
            <ul className={style.listBox}>
              {sortedSizes.map((size, index) => (
                <CustomButton
                  containerStyle={style.sizes}
                  key={index}
                  buttonText={size}
                />
              ))}
            </ul>
          </div>
        </section>
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
