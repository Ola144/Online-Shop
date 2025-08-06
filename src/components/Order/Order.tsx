/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useForm } from "react-hook-form";
import { createOrder, fetchOrderItems } from "../../store/order-slice";
import { useEffect } from "react";

const Order = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { loading } = useSelector((state: RootState) => state.order);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchOrderItems());
  }, [dispatch]);

  const totalPrice = cartItems
    ?.map((item: any) => Number(item.productPrice) * item.productQty)
    .reduce((prevValue: any, currValue: any) => prevValue + currValue, 0);

  // let price = 0;
  let grandTotalPriceWithTax = 0;
  // for (let index = 0; index < cartItems?.length; index++) {
  //   price = cartItems[index].productPrice;

  grandTotalPriceWithTax = (totalPrice + 100).toFixed(2);
  // grandTotalPriceWithTax = (totalPrice * (0 + 5 / 100) * 22).toFixed(2);
  // }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const placeOrder = (customerData: any) => {
    dispatch(
      createOrder(cartItems, customerData, totalPrice, grandTotalPriceWithTax)
    );
  };

  return (
    <div>
      <h1 className="my-4 text-xl font-bold font-mono">Your Order</h1>
      <div className="shadow-lg p-4 rounded-lg bg-gray-300 w-full md:w-full lg:w-full lg:m-0 md:m-0">
        <div className="flex justify-between items-center mb-4">
          <p className="text-white font-bold text-lg">Total Price:</p>
          <p className="text-white font-bold text-lg">${totalPrice}</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-white font-bold text-lg">Tax:</p>
          <p className="text-white font-bold text-lg">
            ${cartItems?.length === 0 ? "0" : "100"}
          </p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-white font-bold text-lg">Delivery Fee:</p>
          <p className="text-white font-bold text-lg">Free</p>
        </div>
        <div className="flex justify-between items-center mb-4 border-t-2 border-t-white">
          <p className="text-white font-bold text-lg">Grand Total Price:</p>
          <p className="text-white font-bold text-lg">
            ${totalPrice === 0 ? "0" : grandTotalPriceWithTax}
          </p>
        </div>
        <div className="my-4">
          <h2 className="text-black font-bold text-lg">
            Customer Information:
          </h2>
          <form onSubmit={handleSubmit(placeOrder)} className="w-full p-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="my-3">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  className={
                    errors.fullName
                      ? "py-3 px-2 bg-gray-400 text-white w-full border-2 border-red-500 rounded-md placeholder:text-white"
                      : "py-3 px-2 bg-gray-400 text-white w-full border-2 border-gray-200 rounded-md placeholder:text-white"
                  }
                  placeholder="Enter Full Name"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && (
                  <span className="text-sm text-red-500">
                    Full Name is a required field!
                  </span>
                )}
              </div>
              <div className="my-3">
                <label htmlFor="phoneNo">Phone No.</label>
                <input
                  type="tel"
                  id="phoneNo"
                  className={
                    errors.phoneNo
                      ? "py-3 px-2 bg-gray-400 text-white w-full border-2 border-red-500 rounded-md placeholder:text-white"
                      : "py-3 px-2 bg-gray-400 text-white w-full border-2 border-gray-200 rounded-md placeholder:text-white"
                  }
                  placeholder="Enter Phone No."
                  {...register("phoneNo", {
                    required: true,
                    pattern: {
                      value: /^(?:0|\+234)(?:70|80|81|90|91)\d{8}$/,
                      message: "Please provide a valid phone no.",
                    },
                  })}
                />
                {errors.phoneNo && (
                  <span className="text-sm text-red-500">
                    Phone No. is a required field!
                  </span>
                )}
              </div>
            </div>

            <div className="my-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className={
                  errors.address
                    ? "py-3 px-2 bg-gray-400 text-white w-full border-2 border-red-500 rounded-md placeholder:text-white"
                    : "py-3 px-2 bg-gray-400 text-white w-full border-2 border-gray-200 rounded-md placeholder:text-white"
                }
                placeholder="Enter Address"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <span className="text-sm text-red-500">
                  Address is a required field!
                </span>
              )}
            </div>
            <div className="flex justify-end">
              {cartItems.length === 0 ? (
                <button
                  className="bg-gray-400 hover:bg-gray-400 text-white py-2 px-3 rounded-lg cursor-no-drop"
                  type="button"
                  disabled
                >
                  Please, add item to the cart
                </button>
              ) : (
                <>
                  {loading ? (
                    <button
                      className={
                        cartItems.length === 0
                          ? "bg-gray-400 hover:bg-gray-400 text-white py-2 px-3 rounded-lg cursor-no-drop"
                          : "bg-red-500 hover:bg-red-400 text-white py-2 px-3 rounded-lg"
                      }
                      type="submit"
                      disabled={cartItems.length === 0}
                    >
                      Place Order
                    </button>
                  ) : (
                    <button
                      className=" bg-gray-400 text-white py-2 px-3 rounded-lg flex justify-center items-center gap-1"
                      type="submit"
                    >
                      Loading{" "}
                      <span className="size-5 border-4 border-gray-300 rounded-full border-t-4 border-t-blue-400 animate-spin"></span>
                    </button>
                  )}
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
