/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { AppThunk } from ".";
import {
  equalTo,
  getDatabase,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  remove,
  set,
} from "firebase/database";
import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

interface IOrder {
  orderItems: { id: string; [key: string]: any }[];
  allOrderItems: { id: string; [key: string]: any }[];
  status: "idle" | "loading" | "succeeded" | "failed";
  errors?: string;
  loading: boolean;
  showOrderCard: boolean;
}

const initialState: IOrder = {
  orderItems: [],
  allOrderItems: [],
  status: "idle",
  errors: undefined,
  loading: false,
  showOrderCard: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchLoading: (state) => {
      state.loading = true;
    },
    fectchNotLoading: (state) => {
      state.loading = false;
    },
    fetchSuccess: (state, action) => {
      state.status = "succeeded";
      state.orderItems = action.payload;
    },
    fetchAllOrderSuccess: (state, action) => {
      state.status = "succeeded";
      state.allOrderItems = action.payload;
    },
    fetchError: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
    isLoading: (state) => {
      state.loading = true;
    },
    isNotLoading: (state) => {
      state.loading = false;
    },
    isShowOrderCard: (state) => {
      state.showOrderCard = true;
    },
    isNoShowOrderCard: (state) => {
      state.showOrderCard = false;
    },
  },
});

export const {
  fetchLoading,
  fectchNotLoading,
  fetchSuccess,
  fetchAllOrderSuccess,
  fetchError,
  isLoading,
  isNotLoading,
  isShowOrderCard,
  isNoShowOrderCard,
} = orderSlice.actions;

export default orderSlice.reducer;

// Thunk: add new item
export const createOrder =
  (
    orderData: object,
    customerInfo: object,
    totalPrice: any,
    grandTotal: any
  ): AppThunk =>
  async (dispatch: any) => {
    dispatch(isLoading());

    try {
      let user;
      const localUser = localStorage.getItem("users");
      if (localUser != null) user = JSON.parse(localUser);

      const database = getDatabase();
      const orderRef = push(ref(database, "orders"));
      const id = orderRef.key;
      await set(orderRef, {
        orders: { ...orderData },
        ...customerInfo,
        totalPrice: totalPrice,
        grandTotal: grandTotal,
        createdAt: new Date().toLocaleString("en-US", {
          day: "2-digit",
          month: "numeric",
          year: "numeric",
        }),
        time: Timestamp.now(),
        userId: user.uid,
        orderId: id,
      });
      toast.success("Order Placed Succesfully!");

      dispatch(isNotLoading());
      window.scrollTo(0, 0);
      dispatch(isShowOrderCard());
    } catch (error: any) {
      toast.error(error.message);
      dispatch(isNotLoading());
    }
  };

export const closeOrderCard = (): AppThunk => (dispatch: any) => {
  dispatch(isNoShowOrderCard());
};

export const fetchAllOrderItems = (): AppThunk => (dispatch: any) => {
  dispatch(fetchLoading());

  try {
    const database = getDatabase();
    const orderRef = ref(database, "orders");
    const q = query(orderRef, orderByChild("orderId"));

    const unsubscribe = onValue(q, (snapshot) => {
      const data = snapshot.val() || {};
      const allOrderItems: any = Object.values(data);
      dispatch(fetchAllOrderSuccess(allOrderItems));
      dispatch(fectchNotLoading());
    });

    return unsubscribe;
  } catch (error: any) {
    toast.error(error.message);
    dispatch(fectchNotLoading());
  }
};

export const fetchOrderItems = (): AppThunk => (dispatch: any) => {
  dispatch(fetchLoading());

  try {
    const storedUser = localStorage.getItem("userId");
    let userId;
    if (storedUser != null) {
      userId = JSON.parse(storedUser);
    }

    const database = getDatabase();
    const orderRef = ref(database, "orders");
    const q = query(orderRef, orderByChild("userId"), equalTo(userId));

    const unsubscribe = onValue(q, (snapshot) => {
      const data = snapshot.val() || {};
      const orderItems: any = Object.entries(data).map(([id, val]) => ({
        id,
        ...(val as object),
      }));
      dispatch(fetchSuccess(orderItems));
    });

    return unsubscribe;
  } catch (error: any) {
    toast.error(error.message);
    dispatch(fectchNotLoading());
  }
};

export const deleteOrder =
  (id: string): AppThunk =>
  async (dispatch: any) => {
    dispatch(isLoading());
    try {
      const database = getDatabase();
      await remove(ref(database, `orders/${id}`));
      dispatch(fetchOrderItems());
      dispatch(fetchAllOrderItems());
      toast.success("Order Deleted Successfully!");
      dispatch(isNotLoading());
    } catch (error: any) {
      toast.error(error.message);
      dispatch(isNotLoading());
    }
  };
