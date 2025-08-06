import { Navigate } from "react-router";

const ProctectedRoute = ({ children }: any) => {
  let user;
  const localUser = localStorage.getItem("onlineShopUsers");
  if (localUser != null) user = JSON.parse(localUser);

  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProctectedRoute;
