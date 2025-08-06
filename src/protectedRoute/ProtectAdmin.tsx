import { Navigate } from "react-router";

const ProtectAdmin = ({ children }: any) => {
  let user;
  const localUser = localStorage.getItem("onlineShopUsers");
  if (localUser != null) user = JSON.parse(localUser);

  if (user.role === "Admin") {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default ProtectAdmin;
