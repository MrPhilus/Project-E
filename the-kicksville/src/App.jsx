import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//pages
import NavPage from "./pages/NavPage";
import Home from "./pages/Home";
import Upcoming from "./pages/Upcoming";
import ContactUs from "./pages/ContactUs";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Error from "./pages/Error";

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
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
