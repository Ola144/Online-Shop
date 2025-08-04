/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { collection, onSnapshot, query } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";
import type { AppThunk } from ".";

interface IOrder {
  userList: { id: string; [key: string]: any }[];
  status: "idle" | "loading" | "succeeded" | "failed";
  errors?: string;
  loading: boolean;
}

const initialState: IOrder = {
  userList: [],
  status: "idle",
  errors: undefined,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchLoading: (state) => {
      state.status = "loading";
    },
    fetchSuccess: (state, action) => {
      state.status = "succeeded";
      state.userList = action.payload;
    },
    fetchError: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
  },
});

export const { fetchLoading, fetchSuccess, fetchError } = userSlice.actions;

export default userSlice.reducer;

export const fetchAllUsers = (): AppThunk => (dispatch: any) => {
  const cartItemsRef = collection(fireDB, "users");
  const q = query(cartItemsRef);
  const unsubsribe = onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(fetchSuccess(items));
    },
    (error) => {
      dispatch(fetchError(error.message));
    }
  );
  return unsubsribe;
};
