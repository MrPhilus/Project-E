import styles from "./LoadScreen.module.css";

const LoadScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
    </div>
  );
};

export default LoadScreen;
