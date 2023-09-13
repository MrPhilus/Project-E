import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <section>
          <ul>
            <li>Order Cancellation</li>
            <li>Shipping and Delivery</li>
            <li>Returns</li>
            <li>News</li>
          </ul>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
