import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <section>
          <ul>
            <li>Find A Store</li>
            <li>Become A Member</li>
            <li>Gift Cards</li>
            <li>FAQ</li>
          </ul>
        </section>
        <section>
          <ul>
            <li>Order Cancellation</li>
            <li>Shipping and Delivery</li>
            <li>Returns</li>
            <li>News</li>
            <li>Careers</li>
          </ul>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
