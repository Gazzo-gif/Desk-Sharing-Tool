import Home from "./Components/Home/Home";
import LoginPage from "./Components/LoginForm/LoginPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      {/* <Home /> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        {/* <LoginPage /> */}
      </Router>
    </>
  );
}

export default App;
