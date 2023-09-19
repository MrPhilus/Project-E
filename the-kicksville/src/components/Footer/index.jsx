import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <section className={styles.content}>
          <h4>Made by Theo</h4>
          <ul>
            <li>Order Cancellation</li>
            <li>Shipping and Delivery</li>
            <li>Returns</li>
          </ul>
          <h4 className={styles.name}>KicksVille™</h4>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
