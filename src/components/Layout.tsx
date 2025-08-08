import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer/Footer";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="mt-16 w-full lg:px-0">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
