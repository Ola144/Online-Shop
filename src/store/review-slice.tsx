/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { AppThunk } from ".";
import { toast } from "react-toastify";
import { databases } from "../appwrite/appwrite";

interface IReview {
  reviewList: any[];
  loading: boolean;
}

const initialState: IReview = {
  reviewList: [],
  loading: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    fetchLoading: (state) => {
      state.loading = true;
    },
    fetchNotLoading: (state) => {
      state.loading = false;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.reviewList = action.payload;
    },
  },
});

export const { fetchLoading, fetchNotLoading, fetchSuccess } =
  reviewSlice.actions;

export default reviewSlice.reducer;

export const getReview = (): AppThunk => async (dispatch: any) => {
  dispatch(fetchLoading());

  try {
    const response = await databases.listDocuments(
      "688e272a003b99b5dc39", // Database ID
      "688e2a0e001606ab412e" // Collection ID
    );
    const data = response.documents || [];
    const dataArr = Object.values(data);
    dispatch(fetchSuccess(dataArr));
    dispatch(fetchNotLoading());
  } catch (error: any) {
    toast.error(error.message);
    dispatch(fetchNotLoading());
  }
};

export const deleteRewiew =
  (reviewId: string): AppThunk =>
  async (dispatch: any) => {
    dispatch(fetchLoading());

    try {
      await databases.deleteDocument(
        "688e272a003b99b5dc39", // Database ID
        "688e2a0e001606ab412e", // Collection ID
        reviewId
      );
      dispatch(getReview());
      toast.success("Review Deleted Successfully!");
      dispatch(fetchNotLoading());
    } catch (error: any) {
      toast.error(error.message);
      dispatch(fetchNotLoading());
    }
  };
