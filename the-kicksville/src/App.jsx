import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//pages
import NavPage from "./pages/NavPage";
import InStock from "./pages/InStock/InStock";
import Upcoming from "./pages/Upcoming/Upcoming";
import ContactUs from "./pages/ContactUs";
import ProductDetails from "./pages/ProductDetails";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route element={<NavPage />}>
//           <Route path="/" element={<InStock />} />
//           <Route path="/upcoming" element={<Upcoming />} />
//           <Route path="/upcoming/:sneakerId" element={<Upcoming />} />
//           <Route path="/contactus" element={<ContactUs />} />
//           <Route path="/details/:sneakerId" element={<ProductDetails />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<NavPage />}>
            <Route index element={<InStock />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/upcoming/:sneakerId" element={<Upcoming />} />
            <Route path="/details/:sneakerId" element={<ProductDetails />} />
            <Route path="/contactus" element={<ContactUs />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
