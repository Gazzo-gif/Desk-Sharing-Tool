import React from 'react';
import Home from "./Components/Home/Home";
import LoginPage from "./Components/LoginForm/LoginPage";
import Floor from "./Components/Floors/Floor";
import Booking from "./Components/Home/Booking";
import Profile from "./Components/Profile/Profile";
import AdminPage from "./Components/AdminPanel/AdminPage"
<<<<<<< HEAD
import MyBookings from "./Components/Home/MyBookings";
=======
import SidebarComponent from './Components/Home/SidebarComponent';
>>>>>>> b270e92 (admin panal rooms and desks)
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
          <Route path="/floor" element={<Floor />}></Route>
          <Route path="/desks" element={<Booking />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route> {/* Add route for AdminPanel */}

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
