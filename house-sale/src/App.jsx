import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HouseListingPage from "./pages/house_listing";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/house/:id' element={<HouseListingPage />} />
      </Routes>
    </Router>
  )
}

export default App
