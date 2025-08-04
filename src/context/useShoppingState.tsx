/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShoppingContext } from "./ShoppingContext";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  // getDocs,
  onSnapshot,
  orderBy,
  // orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";

function useShoppingState({ children }) {
  const [loading, setLoading] = useState<boolean>(false);

  // GET CART ITEM BY USER ID
  const getAllCartItemByUserId = async () => {
    setLoading(true);
    try {
      let user;
      const localUser = localStorage.getItem("users");
      if (localUser != null) user = JSON.parse(localUser);

      const cartItemRef = collection(fireDB, "cartItems");

      const q = query(
        cartItemRef,
        where("userId", "==", user.uid),
        orderBy("date")
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <ShoppingContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}

export default useShoppingState;
