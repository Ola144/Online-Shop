/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import Loader from "../Loader";
import { deleteOrder } from "../../store/order-slice";

const AllOrder = () => {
  const dispatch = useDispatch<any>();

  const { allOrderItems, errors, status, loading } = useSelector(
    (state: RootState) => state.order
  );

  const removeMyOrder = (id: any) => {
    dispatch(deleteOrder(id));
  };

  return (
    <div className="px-5">
      {status === "loading" && <Loader />}
      {
        status === "failed" && <p>{errors}</p>
        // toast.error("Something went wrong. Please try again!")
      }
      {status === "succeeded" && (
        <div>
          {allOrderItems.length === 0 ? (
            <div className="flex justify-center items-center text-red-500 h-full text-4xl mt-20">
              <h1>There is no item ordered yet!</h1>
            </div>
          ) : (
            <div>
              {allOrderItems.map((item) => {
                return (
                  <div className="" key={item.orderId}>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 border-2 border-gray-500 rounded-lg my-5 mx-auto">
                      <div className="col-span-1 md:border-r-2 border-r-gray-500 py-3 px-1 lg:w-fit w-full bg-gray-400 text-white">
                        <p>Name: {item.fullName}</p>
                        <p>Phone Number: {item.phoneNo}</p>
                        <p>Created Date: {item.createdAt}</p>
                        <p>Order Id: {item.orderId}</p>
                      </div>
                      <div className="md:col-span-2 sm:col-span-1 w-fit px-2 py-2 m-auto xl:mx-0">
                        <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-2 w-fit m-2">
                          {item.orders.map((order: any) => {
                            return (
                              <div
                                className="flex items-start justify-center gap-3 m-auto lg:m-0 md:m-0 shadow-lg px-5 py-2 rounded-lg bg-gray-300 w-60"
                                key={order.cartId}
                              >
                                <img
                                  src={order.productImgUrl}
                                  alt={order.productName}
                                  className="w-24 h-24 rounded-lg"
                                />
                                <div className="">
                                  <p className="text-white font-bold text-xs">
                                    Name: {order.productName}
                                  </p>
                                  <p className="text-white font-bold text-xs">
                                    Price: ${order.productPrice}
                                  </p>
                                  <p className="text-white font-bold text-xs">
                                    Quantity: {order.productQty}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="col-span-1 md:col-span-1 md:border-l-2 border-l-gray-500 py-3 px-1 lg:w-full w-full bg-gray-400 text-white">
                        <p>Total Price: ${item.totalPrice}</p>
                        <p>Tax: $100</p>
                        <p>Delivery Fee: Free</p>
                        <p>Grand Total: ${item.grandTotal}</p>
                        <div className="mt-10 flex justify-end">
                          {!loading ? (
                            <button
                              className=" bg-red-500 hover:bg-red-400 text-white py-2 px-3 rounded-lg"
                              type="button"
                              onClick={() => removeMyOrder(item.orderId)}
                            >
                              Delete Order
                            </button>
                          ) : (
                            <button
                              className=" bg-gray-300 text-white py-2 px-3 rounded-lg flex justify-center items-center gap-1"
                              type="submit"
                            >
                              Loading{" "}
                              <span className="size-5 border-4 border-white rounded-full border-t-4 border-t-blue-400 animate-spin"></span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllOrder;
