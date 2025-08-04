/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { AppThunk } from ".";
import { toast } from "react-toastify";
import {
  equalTo,
  get,
  getDatabase,
  orderByChild,
  push,
  query,
  ref,
  remove,
  set,
} from "firebase/database";

interface IProduct {
  productList: { id: string; [key: string]: any }[];
  relatedProductList: { id: string; [key: string]: any }[];
  status: "loading" | "failed" | "idle" | "succeeded";
  loading: boolean;
}

const initialState: IProduct = {
  productList: [],
  relatedProductList: [],
  status: "idle",
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fectchLoading: (state) => {
      state.loading = true;
    },
    fectchNotLoading: (state) => {
      state.loading = false;
    },
    fetchSuccess: (state, action) => {
      state.status = "succeeded";
      state.productList = action.payload;
    },
    fetchRelatedProd: (state, action) => {
      state.status = "succeeded";
      state.relatedProductList = action.payload;
    },
    isLoading: (state) => {
      state.loading = true;
    },
    isNotLoading: (state) => {
      state.loading = false;
    },
  },
});

export const {
  fectchLoading,
  fectchNotLoading,
  fetchSuccess,
  fetchRelatedProd,
  isLoading,
  isNotLoading,
} = productSlice.actions;

export default productSlice.reducer;

export const addProduct =
  (productData: object): AppThunk =>
  async (dispatch: any) => {
    dispatch(isLoading());

    try {
      const database = getDatabase();
      const productRef = push(ref(database, "products"));
      const id = productRef.key;
      await set(productRef, {
        ...productData,
        productId: id,
        productQty: 1,
        date: new Date().toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      });
      toast.success("Product Added Successfully!");
      dispatch(fetchProduct());
      dispatch(isNotLoading());
    } catch (error: any) {
      toast.error(error);
      dispatch(isNotLoading());
    }
  };

export const fetchProduct = () => async (dispatch: any) => {
  dispatch(fectchLoading());

  try {
    const response = await fetch(
      "https://shopping-cart-fa8cb-default-rtdb.firebaseio.com/products.json"
    );
    const data = await response.json();
    const dataArray = Object.values(data);
    dispatch(fetchSuccess(dataArray));
    dispatch(fectchNotLoading());
  } catch (error: any) {
    toast.error(error.message);
    dispatch(fectchNotLoading());
  }
};

export const getRelatedCategoryProduct =
  (categoryName: string, productId: string) => async (dispatch: any) => {
    dispatch(isLoading());

    try {
      const database = getDatabase();
      const productRef = ref(database, "products");
      const q = query(
        productRef,
        orderByChild("productCategory"),
        equalTo(categoryName)
      );

      get(q).then((snapshort) => {
        if (snapshort.exists()) {
          const data = snapshort.val();
          const product = Object.values(data);
          const filteredProduct = product.filter(
            (item: any) => item.productId !== productId
          );
          dispatch(fetchRelatedProd(filteredProduct));
          dispatch(isNotLoading());
        } else {
          dispatch(fetchRelatedProd([]));
          toast.warn("There is no related product");
          dispatch(isNotLoading());
        }
      });
    } catch (error: any) {
      setTimeout(() => {
        // toast.error(error.message);
      }, 3000);

      dispatch(isNotLoading());
    }
  };

export const deleteProduct = (productId: string) => async (dispatch: any) => {
  dispatch(isLoading());

  try {
    const database = getDatabase();
    const productRef = ref(database, `products/${productId}`);
    await remove(productRef);
    dispatch(fetchProduct());
    toast.success("Product Deleted Successfully");
    dispatch(isNotLoading());
  } catch (error: any) {
    toast.error(error.message);
    dispatch(isNotLoading());
  }
};
