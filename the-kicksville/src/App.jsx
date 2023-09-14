import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//pages
import NavPage from "./pages/NavPage";
import Home from "./pages/Home";
import Upcoming from "./pages/Upcoming/Upcoming";
import ContactUs from "./pages/ContactUs";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<NavPage />}>
            <Route path="/" element={<Home />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/upcoming/:sneakerId" element={<Upcoming />} />
            <Route path="/details/:sneakerId" element={<ProductDetails />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
