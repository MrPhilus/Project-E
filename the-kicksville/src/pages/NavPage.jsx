import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/Index";
// import Footer from "../components/Footer";

const NavPage = () => {
  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      <Outlet />
      {/* <div>
        <Footer />
      </div> */}
    </div>
  );
};

export default NavPage;
