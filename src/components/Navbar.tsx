/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router";
import { authActions } from "../store/auth-slice";
import { useRef, useState } from "react";
import type { AppDispatch, RootState } from "../store";
import type { IUser } from "../model/User";
import Search from "./Search";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchBar, setSearchBar] = useState<boolean>(false);

  const { cartItems } = useSelector((state: RootState) => state.cart);
  const navbarRef = useRef<any>(undefined);
  const shadowRef = useRef<any>(undefined);

  const localUser = localStorage.getItem("onlineShopUsers");
  let loggedUserData: IUser = {};
  if (localUser != null) {
    loggedUserData = JSON.parse(localUser);
  }

  const logout = () => {
    dispatch(authActions.logout());
    navigate("/login");
    localStorage.removeItem("onlineShopUsers");
    localStorage.removeItem("onlineShopUserId");
  };

  const toggleNavbar = () => {
    navbarRef.current.classList.toggle("hideMenuNav");
    shadowRef.current.classList.toggle("showShadow");
  };

  const toggleSearchBar = () => {
    if (searchBar === false) {
      setSearchBar(true);
    } else {
      setSearchBar(false);
    }
  };

  return (
    <div className="bg-white w-full text-black py-3 px-10 lg:px-20 fixed top-0 left-0  shadow-lg  shadow-gray-500 z-30">
      <div className="flex justify-between items-center relative">
        <div className="text-lg font-bold">
          <h2>
            {" "}
            <Link to="/">Online Shop</Link>
          </h2>
        </div>
        <div
          className="z-10 shadowBg cursor-pointer"
          ref={shadowRef}
          onClick={() => toggleNavbar()}
        ></div>
        <div
          className={
            loggedUserData.role === "Customer"
              ? "md:flex block gap-3 text-lg md:relative font-bold absolute md:top-0 bottom-0 z-20 -right-6 md:right-0 md:text-right  md:bg-none md:h-full w-80 text-right pr-4 h-screen customer hideMenuNav navDiv"
              : "md:flex block gap-3 text-lg md:relative font-bold absolute md:top-0 bottom-0 z-20 -right-6 md:right-0 md:text-right  md:bg-none md:h-full w-80 text-right pr-4 h-screen admin hideMenuNav navDiv"
          }
          ref={navbarRef}
        >
          <div className="relative md:mb-0 mb-5">
            <NavLink className="menuLink relative" to="/">
              Home
            </NavLink>
          </div>
          <div className="relative md:mb-0 mb-5">
            <NavLink className="menuLink relative" to="/products">
              Products
            </NavLink>
          </div>
          <div className="relative md:mb-0 mb-5">
            <NavLink className="menuLink relative" to="/about">
              About Us
            </NavLink>
          </div>
          <div className="relative md:mb-0 mb-5">
            <NavLink className="menuLink relative" to="/contact">
              Contact Us
            </NavLink>
          </div>

          {loggedUserData.role === "Customer" && (
            <div className="relative md:mb-0 mb-5">
              <NavLink className="menuLink relative" to="/myOrder">
                My Order
              </NavLink>
            </div>
          )}

          {loggedUserData.role === "Admin" && (
            <div className="relative md:mb-0 mb-5">
              <NavLink className="menuLink relative" to="/admin">
                Admin
              </NavLink>
            </div>
          )}

          <div className="relative">
            <button
              className="bg-red-600 text-white w-auto px-3 py-2 text-sm rounded-md hover:bg-red-400 ml-2 md:mt-0 mt-3"
              type="button"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-10 z-50 md:right-5 md:mb-0 mb-5 cursor-pointer">
          <span
            className="text-lg mr-2 md:ml-5"
            onClick={() => toggleSearchBar()}
          >
            <i className="fa fa-search"></i>
          </span>

          <NavLink className="relative cursor-pointer" to="/cart">
            <span className="text-xl">
              <i className="fa fa-shopping-cart"></i>
            </span>
            <span className="absolute top-0 -right-3 bg-red-600 text-white px-0.5 rounded-full text-center text-xs w-4 h-4">
              {cartItems?.length}
            </span>
          </NavLink>
        </div>
        <div
          className="text-black text-lg md:hidden cursor-pointer"
          onClick={() => toggleNavbar()}
        >
          <i className="fa fa-navicon"></i>
        </div>
      </div>
      {searchBar && <Search setSearchBar={setSearchBar} />}
    </div>
  );
};

export default Navbar;
