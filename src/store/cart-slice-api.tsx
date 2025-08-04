/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice } from "@reduxjs/toolkit";
import {
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
  remove,
  //   update,
  getDatabase,
  push,
  set,
} from "firebase/database";
import type { AppThunk } from ".";
import { toast } from "react-toastify";

interface ICart {
  cartItems: { id: string; [key: string]: any }[];
  status: "idle" | "loading" | "succeeded" | "failed";
  errors?: string;
  loading: boolean;
}

const initialState: ICart = {
  cartItems: [],
  status: "idle",
  errors: undefined,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchLoading: (state) => {
      state.loading = true;
    },
    fetchNotLoading: (state) => {
      state.loading = false;
    },
    fetchSuccess: (state, action) => {
      state.cartItems = action.payload;
    },
    fetchError: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
    increaseQty(state, action) {
      const id = action.payload;
      const existingItem = state?.cartItems.find(
        (item: any) => item.cartId === id
      );
      if (existingItem) {
        existingItem.productQty += 1;
      }
    },
    decreaseQty(state, action) {
      const id = action.payload;
      const existingItem = state?.cartItems.find(
        (item: any) => item.cartId === id
      );
      if (existingItem && existingItem.productQty > 1) {
        existingItem.productQty -= 1;
      }
    },
  },
});

export const {
  fetchLoading,
  fetchSuccess,
  fetchError,
  fetchNotLoading,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;

export const increaseQuantity =
  (id: string): AppThunk =>
  (dispatch: any) => {
    dispatch(increaseQty(id));
  };

export const decreaseQuantity =
  (id: string): AppThunk =>
  (dispatch: any) => {
    dispatch(decreaseQty(id));
  };

// Listener thunk
export const fetchCartItems = (): AppThunk => (dispatch: any) => {
  dispatch(fetchLoading());

  try {
    const storedUser = localStorage.getItem("userId");
    let userId;
    if (storedUser != null) {
      userId = JSON.parse(storedUser);
    }

    const database = getDatabase();
    const cartItemsRef = ref(database, "cartItems");
    const q = query(cartItemsRef, orderByChild("userId"), equalTo(userId));

    const unsubscribe = onValue(q, (snapshot) => {
      const data = snapshot.val() || {};
      const cartItems: any = Object.values(data);
      // const cartItems: any = Object.entries(data);
      dispatch(fetchSuccess(cartItems));
      dispatch(fetchNotLoading());
    });

    return unsubscribe;
  } catch (error: any) {
    toast.error(error.message);
    dispatch(fetchNotLoading());
  }

  //   const cartItemsRef = collection(fireDB, "cartItems");
  //   const q = query(
  //     cartItemsRef,
  //     orderBy("date"),

  //   );
  //   const unsubsribe = onSnapshot(
  //     q,
  //     (snapshot) => {
  //       const items = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       dispatch(fetchSuccess(items));
  //     },
  //     (error) => {
  //       dispatch(fetchError(error.message));
  //     }
  //   );
  //   return unsubsribe;
};

// Thunk: add new item
export const createCartItem =
  (cartItemData: object): AppThunk =>
  async () => {
    let user;
    const localUser = localStorage.getItem("users");
    if (localUser != null) user = JSON.parse(localUser);

    const database = getDatabase();
    const cartItemRef = push(ref(database, "cartItems"));
    const id = cartItemRef.key;
    await set(cartItemRef, {
      ...cartItemData,
      createdAt: new Date().toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      cartId: id,
      userId: user.uid,
    });
    toast.success("Product Added To Cart!");
  };

// Thunk to delete an item
export const deleteCartItem =
  (productId: string): AppThunk =>
  async () => {
    //Realtime Database
    const database = getDatabase();
    await remove(ref(database, `cartItems/${productId}`));
    toast.success("Product Deleted Successfully!");

    // Firestore Database
    // const cartItemsRef = doc(fireDB, "cartItems", productId);
    // await deleteDoc(cartItemsRef);
    // toast.success("Product Deleted Successfully!");
  };
