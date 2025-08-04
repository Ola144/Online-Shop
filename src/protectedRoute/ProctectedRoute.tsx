import { Navigate } from "react-router";

const ProctectedRoute = ({ children }) => {
  let user;
  const localUser = localStorage.getItem("users");
  if (localUser != null) user = JSON.parse(localUser);

  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProctectedRoute;
