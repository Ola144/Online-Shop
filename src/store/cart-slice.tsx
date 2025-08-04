/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

// interface ICart {
//   itemsList: any[];
// }

// const cart: ICart = {
//   itemsList: [],
// };

let cartItems;
const localUser = localStorage.getItem("cartItems");
if (localUser != null) cartItems = JSON.parse(localUser);

const initialState = cartItems ?? [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart(state, action) {
      const newItem: any = action.payload;
      // to chech if item is already available
      const existeingItem: any = state?.find(
        (item: any) => item.id === newItem.id
      );
      if (existeingItem) {
        existeingItem.quantity++;
        existeingItem.totalPrice += newItem.price;
      } else {
        state?.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existeingItem = state?.find((item: any) => item.id === id);
      if (existeingItem) {
        return state.filter((item: any) => item.id !== id);
      }
    },
    increaseQty(state, action) {
      const id = action.payload;
      const existeingItem = state?.find((item: any) => item.id === id);
      if (existeingItem) {
        existeingItem.quantity++;
      }
    },
    decreaseQty(state, action) {
      const id = action.payload;
      const existeingItem = state?.find((item: any) => item.id === id);
      if (existeingItem) {
        if (existeingItem.quantity > 1) existeingItem.quantity--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
