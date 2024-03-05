import React from 'react';
import Home from "./Components/Home/Home";
import LoginPage from "./Components/LoginForm/LoginPage";
import Floor from "./Components/Floors/Floor"; // Import the Floor component
import Booking from "./Components/Home/Booking";
import Profile from "./Components/Profile/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/floor" element={<Floor />}></Route> {/* Add the route for Floor */}
          <Route path="/desks" element={<Booking />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;