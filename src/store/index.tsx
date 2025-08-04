import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import cartSlice from "./cart-slice-api";
import orderSlice from "./order-slice";
import userSlice from "./user-slice";
import productSlice from "./product-slice";
import categorySlice from "./category-slice";
import reviewSlice from "./review-slice";
import contactSlice from "./contact-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice,
    order: orderSlice,
    user: userSlice,
    product: productSlice,
    category: categorySlice,
    review: reviewSlice,
    contact: contactSlice,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = (
  dispatch: AppDispatch,
  getState: () => RootState
) => ReturnType;
