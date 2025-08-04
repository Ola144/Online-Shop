/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, type ReactNode } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";

export const ShoppingContext = createContext<any>(undefined);

export const ShoppingProvider = ({ children }: { children: ReactNode }) => {
  const getCartItemByUserId = async () => {
    let userId;
    const localUser = localStorage.getItem("users");
    if (localUser != null) {
      userId = JSON.parse(localUser);
    }
    try {
      console.log(userId.uid);

      const cartItemRef = collection(fireDB, "cartItems");
      const q = query(
        cartItemRef,
        orderBy("date")
        //   where("userId", "==", userId.uid)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ShoppingContext.Provider
      value={{
        getCartItemByUserId,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};
