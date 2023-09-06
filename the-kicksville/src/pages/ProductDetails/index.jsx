import CustomButton from "../../components/CustomButton";
import style from "./ProductDetails.module.css";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useContext, useEffect } from "react";
import { KicksContext } from "../../context/KicksContextProvider";
import { BiChevronsDown } from "react-icons/bi";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { selectedSneaker, sizes, setSizes } = useContext(KicksContext);
  // const [size, setSize] = useState({});

  const handleBackClick = () => {
    navigate(`/upcoming/${selectedSneaker.id}`);
  };

  function formattedPrice(price) {
    return `$${price / 100}`;
  }

  const formattedPriceValue = formattedPrice(
    selectedSneaker.retail_price_cents
  );

  useEffect(() => {
    // const sortedSizes = selectedSneaker.size_range.sort((a, b) => a - b);
    console.log("selectedSneaker:", selectedSneaker);
    const sortedSizes = selectedSneaker
      ? selectedSneaker.size_range.sort((a, b) => a - b)
      : [];
    console.log(sortedSizes);
    setSizes(sortedSizes);
  }, []);

  return selectedSneaker ? (
    <div>
      <div className={style.container}>
        <div className={style.aside}>
          <div>
            <IoMdArrowRoundBack
              style={{
                fontSize: "3.5vmax",
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
              {sizes.map((size, index) => (
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

      {/* mobile layout */}
      <div className={style.mobileContainer}>
        <div className={style.asideMobi}>
          <div>
            <IoMdArrowRoundBack
              style={{
                fontSize: "3.5vmax",
                cursor: "pointer",
              }}
              onClick={handleBackClick}
            />
          </div>
          <section>
            <h2>{selectedSneaker.name}</h2>
            <h3>{selectedSneaker.details}</h3>
            <h3>{formattedPriceValue}</h3>
          </section>
        </div>

        <div className={style.detailsMobi}>
          <section className={style.storyMobi}>
            <div>
              <img
                className={style.imageMobi}
                src={selectedSneaker.grid_picture_url}
                alt=""
              />

              <details className={style.dropDownMobi}>
                <summary>
                  <h3>Available Sizes</h3>{" "}
                  <BiChevronsDown className={style.arrowDownMobi} size={20} />
                </summary>
                <ul className={style.listBoxMobi}>
                  {/* {sortedSizes.map((size, index) => (
                    <CustomButton
                      containerStyle={style.sizesMobi}
                      key={index}
                      buttonText={size}
                    />
                  ))} */}
                </ul>
              </details>
            </div>
          </section>
        </div>

        <div className={style.sizeRangeMobi}>
          <p className={style.writeUpMobi}>{selectedSneaker.story_html}</p>
          <CustomButton
            containerStyle={style.buttonMobi}
            buttonText={"add to cart"}
          />
        </div>
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
