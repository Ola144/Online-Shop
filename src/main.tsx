// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/index.tsx";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <StrictMode> */}
    <UserProvider>
      <App children={undefined} />
      <ToastContainer />
    </UserProvider>
    {/* </StrictMode> */}
  </Provider>
);
