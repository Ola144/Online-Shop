/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import Loader from "../Loader";
import type { RootState } from "../../store";
import { deleteCartItem, fetchCartItems } from "../../store/cart-slice-api";
import { useEffect } from "react";
import Order from "../Order/Order";
import OrderCard from "../Order/OrderCard";

const Cart = () => {
  const dispatch = useDispatch<any>();

  const { cartItems, loading } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const increaseQty = (id: any) => {
    dispatch(cartActions.increaseQty(id));
  };

  const decreaseQty = (id: any) => {
    dispatch(cartActions.decreaseQty(id));
  };

  const removeCartItem = (id: any) => {
    dispatch(deleteCartItem(id));
  };

  return (
    <>
      <div className="py-3 px-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 items-start justify-center md:mx-0 p-5 xl:gap-24 md:gap-0 w-fit">
          <div className="col-span-1 lg:col-span-1 md:col-span-1">
            <h1 className="my-4 text-xl font-bold font-mono">Your Cart</h1>
            <div className="w-full">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {cartItems?.length === 0 ? (
                    <>
                      <div className="text-center text-2xl md:text-2xl lg:text-4xl text-red-500 font-bold h-full">
                        <div>No Product Found In The Cart!</div>
                      </div>
                    </>
                  ) : (
                    <div className=" w-full md:mx-0">
                      <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:gap-20 gap-5 md:mx-0">
                        {cartItems?.map((item: any) => {
                          return (
                            <div
                              className="flex items-start justify-center gap-2 md:w-80 sm:w-full shadow-lg px-2 py-4 rounded-lg bg-gray-300 w-96 mx-auto md:mx-0"
                              key={item.cartId}
                            >
                              <img
                                src={item.cartItemData.productImgUrl}
                                alt={item.cartItemData.productName}
                                className="w-32 h-32 rounded-lg"
                              />
                              <div className="">
                                <p className="text-white font-bold text-sm">
                                  Name: {item.cartItemData.productName}
                                </p>
                                <p className="text-white font-bold text-sm">
                                  Price: ${item.cartItemData.productPrice}
                                </p>
                                <p className="text-white font-bold md:text-sm sm:text-xs text-sm">
                                  Quantity:{" "}
                                  <button
                                    className="w-auto px-2 py-1 bg-white text-black font-bold rounded-lg"
                                    onClick={() => decreaseQty(item.cartId)}
                                  >
                                    -
                                  </button>{" "}
                                  {item.cartItemData.productQty}{" "}
                                  <button
                                    className="w-auto px-2 py-1 bg-white text-black font-bold rounded-lg"
                                    onClick={() => increaseQty(item.cartId)}
                                  >
                                    +
                                  </button>
                                </p>
                                <div className="flex justify-end my-2">
                                  <button
                                    className="w-auto px-2 py-1 bg-red-500 text-white font-bold rounded-lg"
                                    onClick={() => removeCartItem(item.cartId)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="col-span-1">
            <div className="w-fit">
              <Order />
            </div>
          </div>
        </div>
      </div>
      <OrderCard />
    </>
  );
};

export default Cart;
