/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar/Index";
import { useEffect, useContext } from "react";
import { KicksContext } from "../context/KicksContextProvider";

import Footer from "../components/Footer";

const NavPage = () => {
  const { setSelectedSneaker, selectedSneaker } = useContext(KicksContext);
  const { pathname } = useLocation();
  useEffect(() => {
    // Save state before refresh
    const shoe = sessionStorage.getItem("shoeState") || JSON.stringify({});
    const parsedShoe = JSON.parse(shoe);
    console.log(parsedShoe);

    //sets item on refresh
    setSelectedSneaker((prev) => {
      console.log(prev);
      return parsedShoe;
    });
  }, []);

  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      {pathname.includes("details") &&
        Object.keys(selectedSneaker).length > 0 && <Outlet />}
      {!pathname.includes("details") && <Outlet />}
      <div>
        {!(pathname === "/" || pathname.includes("/cart")) && <Footer />}
      </div>
    </div>
  );
};

export default NavPage;
