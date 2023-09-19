import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import { KicksContext } from "../../context/KicksContextProvider";

//Resources
import logo from "../../assets/images/kicks.png";
import { TiShoppingCart } from "react-icons/ti";
import { BiChevronsDown } from "react-icons/bi";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menuOpen, setMenuOpen, cartItems, searchQuery, setSearchQuery } =
    useContext(KicksContext);

  //controls the opening and closing of drop-down
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  //closes the drop-down when a link is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // search function handling
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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
            Home
          </Link>

          <Link to="/upcoming" className={styles.navLink}>
            Upcoming
          </Link>

          <Link to="/contactus" className={styles.navLink}>
            Contact Us
          </Link>
        </section>

        {(location.pathname === "/upcoming" ||
          location.pathname.startsWith("/upcoming/")) && (
          <div className={styles.filterContainer}>
            <section className={styles.searchBox}>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search by name or color"
                value={searchQuery}
                onInput={handleSearch}
              />
            </section>
          </div>
        )}

        <section className={styles.cartSide}>
          <BiChevronsDown
            className={styles.dropDown}
            size={30}
            onClick={toggleMenu}
          />

          <Link to="/cart" style={{ color: "black" }}>
            <div className={styles.cartIcon}>
              {cartItems.length !== 0 && (
                <span className={styles.itemsNum}>{cartItems.length}</span>
              )}
              <TiShoppingCart size={30} />
            </div>
          </Link>
        </section>
      </nav>

      {/* conditionally rendering the drop-down menu for mobile */}
      {menuOpen && (
        <nav className={styles.mobileMenu} onClick={closeMenu}>
          <Link to="/" className={styles.mobileNavLink}>
            Home
          </Link>
          <Link to="/upcoming" className={styles.mobileNavLink}>
            Upcoming
          </Link>
          <Link to="/contactus" className={styles.mobileNavLink}>
            Contact Us
          </Link>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
