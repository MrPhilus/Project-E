import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import NavPage from "./pages/NavPage";
import InStock from "./pages/InStock/InStock";
import Upcoming from "./pages/Upcoming/Upcoming";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<NavPage />}>
          <Route path="/" element={<InStock />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
