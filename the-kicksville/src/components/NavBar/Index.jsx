import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";

//Resources
import logo from "../../assets/images/kicks.png";
import { TiShoppingCart } from "react-icons/ti";
import { BiChevronsDown } from "react-icons/bi";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  //controls the opening and closing of drop-down
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  //closes the drop-down when a link is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <section className={styles.logoSide}>
          <img
            className={styles.logoImg}
            src={logo}
            alt="logo"
            onClick={() => navigate("/")}
          />
          <span className={styles.logoText}>KicksVille</span>
        </section>

        <section className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>
            In Stock
          </Link>
          <Link to="/upcoming" className={styles.navLink}>
            Upcoming
          </Link>
          <Link to="/contactus" className={styles.navLink}>
            Contact Us
          </Link>
        </section>

        <section className={styles.cartSide}>
          <BiChevronsDown
            className={styles.dropDown}
            size={30}
            onClick={toggleMenu}
          />
          <TiShoppingCart size={30} />
        </section>
      </nav>

      {/* conditionally rendering the drop-down menu for mobile */}
      {menuOpen && (
        <div className={styles.mobileMenu} onClick={closeMenu}>
          <Link to="/" className={styles.mobileNavLink}>
            In Stock
          </Link>
          <Link to="/upcoming" className={styles.mobileNavLink}>
            Upcoming
          </Link>
          <Link to="/contactus" className={styles.mobileNavLink}>
            Contact Us
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
