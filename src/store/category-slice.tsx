/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { getDatabase, push, ref, set } from "firebase/database";
import { toast } from "react-toastify";

interface ICategory {
  categoryList: any[];
  status: "idle" | "failed" | "suceeded" | "loading";
  loading: boolean;
  error: string;
}

const initialState: ICategory = {
  categoryList: [],
  status: "idle",
  loading: false,
  error: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchLoading: (state) => {
      state.loading = true;
    },
    fetchNotLoading: (state) => {
      state.loading = false;
    },
    fetchSuccess: (state, action) => {
      state.status = "suceeded";
      state.categoryList = action.payload;
    },
    fetchError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    isAddCategory: (state) => {
      state.loading = true;
    },
    isNotAddCategory: (state) => {
      state.loading = false;
    },
  },
});

export const {
  fetchLoading,
  fetchNotLoading,
  fetchSuccess,
  fetchError,
  isAddCategory,
  isNotAddCategory,
} = categorySlice.actions;

export default categorySlice.reducer;

export const addCategory =
  (categoryData: object): any =>
  async (dispatch: any) => {
    dispatch(isAddCategory());

    try {
      const database = getDatabase();
      const categoryRef = push(ref(database, "category"));
      const id = categoryRef.key;
      await set(categoryRef, {
        categoryId: id,
        ...categoryData,
      });
      toast.success("Category Added Successfully!");
      dispatch(isNotAddCategory());
    } catch (error: any) {
      toast.error(error);
      dispatch(isNotAddCategory());
    }
  };

export const fetchCategory = () => async (dispatch: any) => {
  dispatch(fetchLoading());

  try {
    const response = await fetch(
      "https://shopping-cart-fa8cb-default-rtdb.firebaseio.com/category.json"
    );
    const data = (await response.json()) || [];
    const dataArray = Object.values(data);
    dispatch(fetchSuccess(dataArray));
    dispatch(fetchNotLoading());

    return () => data;

    // const database = getDatabase();
    // const categoryRef = ref(database, "category");
    // const q = query(categoryRef);

    // const unsubscribe = onValue(q, (snapshot) => {
    //   const data = snapshot.val() || {};
    //   const category: any = Object.entries(data).map(([id, val]) => ({
    //     id,
    //     ...(val as object),
    //   }));
    //   dispatch(fetchSuccess(category));
    // });
    // return unsubscribe;
  } catch (error: any) {
    toast.error(error.message);
    dispatch(fetchNotLoading());
  }
};
