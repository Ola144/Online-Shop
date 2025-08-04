/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "./components/Account/Login";
import Signup from "./components/Account/Signup";
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound";
import ProctectedRoute from "./protectedRoute/ProctectedRoute";
import type React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCartItems } from "./store/cart-slice-api";
import { fetchAllOrderItems, fetchOrderItems } from "./store/order-slice";
import MyOrder from "./components/Order/MyOrder";
import Admin from "./components/Admin/Admin";
import { fetchAllUsers } from "./store/user-slice";
import ProtectAdmin from "./protectedRoute/ProtectAdmin";
import ProductDetails from "./components/products/ProductDetails";
import CategoryPage from "./components/Home/CategoryPage";
import { fetchCategory } from "./store/category-slice";
import ScrollToTop from "./components/ScrollToTop";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Review from "./components/Review/Review";
import { getReview } from "./store/review-slice";
import { getContact } from "./store/contact-slice";

function App({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    const unsubscribeCart = dispatch(fetchCartItems()) as () => void;
    const unsubscribeOrder = dispatch(fetchOrderItems()) as () => void;
    const unsubscribeAllOrder = dispatch(fetchAllOrderItems()) as () => void;
    const unsubscribeAllUser = dispatch(fetchAllUsers()) as () => void;
    dispatch(fetchCategory());
    dispatch(getReview());
    dispatch(getContact());

    return () => (
      unsubscribeCart(),
      unsubscribeOrder(),
      unsubscribeAllOrder(),
      unsubscribeAllUser()
    );
  }, [dispatch]);

  return (
    <>
      <div>
        {children}

        <Router>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <ProctectedRoute>
                  <Layout />
                </ProctectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="cart" element={<Cart />} />
              <Route path="myOrder" element={<MyOrder />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="review" element={<Review />} />
              <Route path="/productDetails/:id" element={<ProductDetails />} />
              <Route
                path="/category/:categoryName"
                element={<CategoryPage />}
              />

              <Route
                path="admin"
                element={
                  <ProtectAdmin>
                    <Admin />
                  </ProtectAdmin>
                }
              />
            </Route>
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
