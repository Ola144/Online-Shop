import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="bg-white w-full text-black py-3  shadow-lg  shadow-gray-500 mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-3 border-b-2 border-b-gray-600 w-full px-6 py-3">
        <div className="mx-auto text-center sm:text-left">
          <h1 className="font-black font-sans text-2xl mb-3">Online Shop</h1>
          <p className="text-justify text-sm font-serif">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni rem
            quaerat recusandae! Eaque cum sequi nesciunt quia, similique placeat
            sunt numquam maxime, repudiandae, debitis blanditiis ipsam officia
            repellat. Error ut consequuntur nobis dolor dicta laborum dolores
            nam at molestias quod?
          </p>
          <div className="flex gap-3 mt-4">
            <span
              className="text-white text-xl bg-red-500 size-8 py-1 rounded-full text-center cursor-pointer"
              style={{ lineHeight: 1 }}
            >
              <i className="fa fa-facebook"></i>
            </span>
            <span
              className="text-white text-xl bg-red-500 size-8 py-1 rounded-full text-center cursor-pointer"
              style={{ lineHeight: 1 }}
            >
              <i className="fa fa-twitter"></i>
            </span>
            <span
              className="text-white text-xl bg-red-500 size-8 py-1 rounded-full text-center cursor-pointer"
              style={{ lineHeight: 1 }}
            >
              <i className="fa fa-youtube"></i>
            </span>
            <span
              className="text-white text-xl bg-red-500 size-8 py-1 rounded-full text-center cursor-pointer"
              style={{ lineHeight: 1 }}
            >
              <i className="fa fa-instagram"></i>
            </span>
          </div>
        </div>
        <div className="mx-auto text-center sm:text-left w-fit">
          <h1 className="font-thin text-xl mb-3">QUICK LINKS</h1>
          <div className="mt-3 font-bold ">
            <p className="mb-2 relative w-fit">
              <Link className="footerLink w-fit" to="/">
                HOME
              </Link>
            </p>
            <p className="mb-2 relative w-fit">
              <Link className="footerLink w-fit" to="/products">
                PRODUCTS
              </Link>
            </p>
            <p className="mb-2 relative w-fit">
              <Link className="footerLink w-fit" to="/about">
                ABOUT
              </Link>
            </p>
            <p className="mb-2 relative w-fit">
              <Link className="footerLink w-fit" to="/contact">
                CONTACT
              </Link>
            </p>
            <p className="mb-2 relative w-fit">
              <Link className="footerLink w-fit" to="/review">
                REVIEWS
              </Link>
            </p>
          </div>
        </div>
        <div className="mx-auto sm:mx-0 text-center sm:text-left">
          <h1 className="font-thin text-xl mb-3">CONTACT US</h1>
          <div className="mt-3 font-bold relative">
            <div className="mb-2 relative">
              <p>Do you have any questions or suggestions?</p>

              <p className="relative w-fit mx-auto sm:mx-0">
                <a href="" className="contactLink text-gray-500 w-fit">
                  contact@onlineshopping.com
                </a>
              </p>
            </div>
            <div className="mb-2 relative">
              <p> Do you need support? Give us a call.</p>
              <p className="w-fit mx-auto sm:mx-0 relative text-center">
                <a href="" className="contactLink text-gray-500 ">
                  +234 81 333 333 33
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-10 mx-auto">
        <div className="text-gray-500 font-bold ">
          <p>
            We ship with ease. Payment Opation:{" "}
            <span className="gap-2 text-2xl text-red-500 font-bold">
              <i className="fa fa-cc-mastercard mx-1"></i>
              <i className="fa fa-cc-visa mx-1"></i>
              <i className="fa fa-cc-paypal mx-1"></i>
            </span>
          </p>
        </div>
        <div className="text-gray-500 font-bold relative">
          <p>
            <i className="fa fa-copyright"></i> Copyright 2025 Online Shopping.
            All rights reserved. Develop by
          </p>
          <p className="font-black text-black text-lg text-right">
            Fortunate Tech!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
