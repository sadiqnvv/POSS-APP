import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Basket from "./pages/Basket";
import Products from "./pages/Products";
import Bills from './pages/Bills'
import Customer from "./pages/Customer";
import StatisticPage from "./pages/Statistics";
import Register from './pages/auth/Register'
import Login from "./pages/auth/Login";

function App() {
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <RouteControl>
            <Home />
          </RouteControl>}
        />
        <Route path='/basket' element={
          <RouteControl>
            <Basket />
          </RouteControl>}
        />
        <Route path='/invoices' element={
          <RouteControl>
            <Bills />
          </RouteControl>}
        />
        <Route path='/products' element={
          <RouteControl>
            <Products />
          </RouteControl>}
        />
        <Route path="/customers" element={
          <RouteControl>
            <Customer />
          </RouteControl>}
        />
        <Route path="/statistics" element={
          <RouteControl>
            <StatisticPage />
          </RouteControl>}
        />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
