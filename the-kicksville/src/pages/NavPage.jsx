import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/Index";

const NavPage = () => {
  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      <Outlet />
      <footer>footer</footer>
    </div>
  );
};

export default NavPage;
