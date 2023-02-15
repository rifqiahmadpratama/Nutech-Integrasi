import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";

//pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PageDeviceNotSupported from "./pages/PageDeviceNotSupport";

// Components
import ScrollToTop from "./components/ScrollToTop";
import useWindowDimensions from "./components/WindowSize";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

//Modules
import { ToastContainer } from "react-toastify";

function App() {
  let location = useLocation();
  const { height, width } = useWindowDimensions();
  return (
    <>
      <ScrollToTop>
        {width >= 576 ? (
          location.pathname === "/register" ||
          location.pathname === "/login" ||
          location.pathname === "/home" ? null : (
            <Navbar />
          )
        ) : null}
        {width >= 576 ? (
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace="true" />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="*" element={<PageDeviceNotSupported />} />
          </Routes>
        )}
        <ToastContainer />
        {width >= 576 ? (
          location.pathname === "/login" ||
          location.pathname === "/home" ||
          location.pathname === "/register" ? null : (
            <Footer />
          )
        ) : null}
      </ScrollToTop>
    </>
  );
}

export default App;
