/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import styles from "./Home.module.css";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoadScreen from "../../components/LoadingScreen/index";
import { KicksContext } from "../../context/KicksContextProvider";

const Home = () => {
  const slideShow = [
    {
      pic: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/163492f2-ec02-4430-aa57-db32039a2b09/air-griffey-max-1-mens-shoes-6q83v3.png",
    },
    {
      pic: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e0a0b38e-cd18-45da-8b7c-fd75d5b65465/air-griffey-max-1-mens-shoes-6q83v3.png",
    },
    {
      pic: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/572a3c3d-8244-4e32-add1-99a080db2a60/air-griffey-max-1-mens-shoes-6q83v3.png",
    },
    {
      pic: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/01238456-7420-4409-ac61-a216ab8a8832/air-griffey-max-1-mens-shoes-6q83v3.png",
    },
    {
      pic: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e48e274f-bb8e-4ed2-be5b-d8728d8453eb/air-griffey-max-1-mens-shoes-6q83v3.png",
    },
    {
      pic: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/aa7bc858-0c35-4328-8faf-f2552638ed40/air-griffey-max-1-mens-shoes-6q83v3.png",
    },
  ];

  const { mainPicIndex, setMainPicIndex, imageLoading, setImageLoading } =
    useContext(KicksContext);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the next to display
      const nextIndex = (mainPicIndex + 1) % slideShow.length;
      setMainPicIndex(nextIndex);
    }, 3500);

    return () => clearInterval(interval);
  }, [mainPicIndex, slideShow]);

  const handleClick = () => {
    navigate("/upcoming");
  };

  const handleImageLoad = () => {
    // Called when the image successfully loads
    setImageLoading(false);
  };

  return (
    <div className={styles.mainContainer}>
      <section className={styles.picBox}>
        <aside className={styles.grid}>
          {slideShow.map((item, index) => (
            <img
              className={styles.gridPic}
              key={index}
              src={item.pic}
              alt=""
              onMouseEnter={() => setMainPicIndex(index)}
              onLoad={handleImageLoad}
              onError={handleImageLoad}
            />
          ))}
        </aside>

        <div className={styles.mainPic}>
          {imageLoading ? (
            // Show loading screen while images are loading
            <div className={styles.loadingScreen}>
              <LoadScreen />
            </div>
          ) : (
            <img
              className={styles.mainImg}
              src={slideShow[mainPicIndex].pic}
              alt=""
            />
          )}
        </div>
      </section>

      <section className={styles.textBox}>
        <h1 className={styles.header}> KicksVille</h1>
        <br />

        <p>
          Discover the perfect blend of fashion and function with our exclusive
          collection of premium sneakers. Elevate your footwear game and make a
          statement wherever you go. Whether you're an avid athlete or a fashion
          enthusiast, our sneakers are designed to cater to your unique style
          and performance needs.
        </p>
        <br />
        <p>
          Shop with confidence knowing that quality is our top priority. We
          partner with renowned brands and manufacturers to offer you the finest
          sneakers that blend style, comfort, and durability. All for fantastic
          prices provide unmatched value.
        </p>
        <br />
        <button onClick={handleClick} className={styles.action}>
          see more!
        </button>
      </section>
    </div>
  );
};

export default Home;
