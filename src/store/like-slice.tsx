import { createSlice } from "@reduxjs/toolkit";
import { onValue, push, query, ref, remove, set } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import type { AppThunk } from ".";

interface ILike {
  likeList: any[];
  singleProdLike: any;
}

const initialState: ILike = {
  likeList: [],
  singleProdLike: [],
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    setLikes: (state, action) => {
      state.likeList = action.payload;
    },
    setSingleProdLikes: (state, action) => {
      state.singleProdLike = action.payload;
    },
    deleteLike: (state, action) => {
      state.likeList = state.likeList.filter(
        (item: any) => item.likeId !== action.payload
      );
    },
  },
});

export const { setLikes, setSingleProdLikes, deleteLike } = likeSlice.actions;
export default likeSlice.reducer;

export const fetchUserLikes = (): AppThunk => async (dispatch: any) => {
  const likeRef = ref(database, "likes");
  const q = query(likeRef);

  const unsubscribe = onValue(q, (snapshot) => {
    const like = snapshot.val() || {};
    const likeArr = Object.entries(like).map(([id, value]) => ({
      id,
      value,
    }));
    dispatch(setLikes(likeArr));
  });
  return unsubscribe;
};

export const addLikeToDB =
  (productId: string): AppThunk =>
  async (dispatch: any) => {
    let localUserId = localStorage.getItem("onlineShopUserId");
    let userId: any;
    if (localUserId != null) userId = JSON.parse(localUserId);

    const likeRef = push(ref(database, "likes"));
    const id = likeRef.key;
    await set(likeRef, {
      likeId: id,
      productId,
      userId,
    });
    dispatch(fetchUserLikes());
  };

export const removerLikeFromDB =
  (id: string): AppThunk =>
  async (dispatch: any) => {
    var likeRef = ref(database, `likes/${id}`);
    await remove(likeRef);
    dispatch(fetchUserLikes());
  };
