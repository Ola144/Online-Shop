/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = async (data: any) => {
    setLoader(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        data.emailId,
        data.password
      );

      try {
        const q = query(
          collection(fireDB, "users"),
          where("uid", "==", users.user.uid)
        );

        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("onlineShopUsers", JSON.stringify(user));
          localStorage.setItem(
            "onlineShopUserId",
            JSON.stringify(users.user.uid)
          );

          navigate("/");
        });

        return () => data;
      } catch (error: any) {
        toast.error(error.message);
        setLoader(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoader(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-purple-300 min-h-screen">
      <div className="w-96 bg-purple-700 text-white py-10 px-3 rounded-lg">
        <h2 className="text-center text-4xl font-semibold">Login</h2>
        <form onSubmit={handleSubmit(loginUser)}>
          <div className="my-3">
            <label htmlFor="emailId">Email</label>
            <input
              type="email"
              id="emailId"
              className={
                errors.emailId
                  ? "py-3 px-2 bg-white text-purple-700 w-full border-2 border-red-500 rounded-md placeholder:text-purple-700"
                  : "py-3 px-2 bg-white text-purple-700 w-full border-2 border-black rounded-md placeholder:text-purple-700"
              }
              placeholder="Enter Email"
              {...register("emailId", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "*Please provide a valid email!",
                },
              })}
            />
            {errors.emailId && (
              <span className="text-red-500 text-sm font-bold">
                *Email is a required field!
              </span>
            )}
          </div>
          <div className="my-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className={
                errors.password
                  ? "py-3 px-2 bg-white text-purple-700 w-full border-2 border-red-500 rounded-md placeholder:text-purple-700"
                  : "py-3 px-2 bg-white text-purple-700 w-full border-2 border-black rounded-md placeholder:text-purple-700"
              }
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm font-bold">
                *Email is a required field!
              </span>
            )}
          </div>
          {!loader ? (
            <button
              className="w-full text-white hover:bg-black bg-black/50 py-3 rounded-md shadow-lg transition-all"
              type="submit"
            >
              Login
            </button>
          ) : (
            <button
              className="w-full text-white bg-gray-400 py-3 rounded-md shadow-lg transition-all flex justify-center items-center gap-1 cursor-not-allowed"
              type="button"
              disabled
            >
              <span className="border-4 broder-t-4 border-white border-t-blue-400 p-2 rounded-full animate-spin"></span>
              Processing
            </button>
          )}

          <p className="text-black font-bold text-lg mt-3">
            Dont't have account yet signup{" "}
            <span className="text-white hover:underline">
              <NavLink to="/signup">here</NavLink>
            </span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
