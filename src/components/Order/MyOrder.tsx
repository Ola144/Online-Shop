/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import type { IUser } from "../../model/User";
import Loader from "../Loader";
import { deleteOrder } from "../../store/order-slice";

function MyOrder() {
  const { orderItems, loading, status, errors } = useSelector(
    (state: RootState) => state.order
  );

  const dispatch = useDispatch<any>();

  const localUser = localStorage.getItem("users");
  let loggedUserData: IUser = {};
  if (localUser != null) {
    loggedUserData = JSON.parse(localUser);
  }

  const removeMyOrder = (id: any) => {
    dispatch(deleteOrder(id));
  };

  return (
    <>
      <div className="w-3/4 py-5 text-center mt-20 mx-auto bg-gradient-to-tr from-gray-500 via-gray-700 to-gray-800 rounded-lg text-white">
        <p>Name: {loggedUserData.name}</p>
        <p>Email: {loggedUserData.email}</p>
        <p>Role: {loggedUserData.role}</p>
        <p>Password: {loggedUserData.password}</p>
        <p>Date: {loggedUserData.date}</p>
      </div>

      {status === "loading" && <Loader />}
      {
        status === "failed" && <p>{errors}</p>
        // toast.error("Something went wrong. Please try again!")
      }
      {status === "succeeded" && (
        <div>
          {orderItems.length === 0 ? (
            <div className="flex justify-center items-center text-red-500 h-full text-4xl mt-20">
              <h1>You've not order any item yet!</h1>
            </div>
          ) : (
            <div>
              {orderItems.map((item) => {
                return (
                  <div className="pb-5" key={item.orderId}>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 border-2 border-gray-500 rounded-lg my-10 mx-5">
                      <div className="col-span-1 md:border-r-2 border-r-gray-500 py-3 px-1 lg:w-fit w-full bg-gray-400 text-white">
                        <p>Created Date: {item.createdAt}</p>
                        <p>Order Id: {item.orderId}</p>
                      </div>
                      <div className="md:col-span-2 sm:col-span-1 w-fit px-2 py-2 m-auto xl:mx-0">
                        <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-2 w-fit m-2">
                          {item.orders.map((order: any) => {
                            return (
                              <div
                                className="flex items-start justify-center gap-3 m-auto lg:m-0 md:m-0 shadow-lg px-10 py-2 rounded-lg bg-gray-300 w-full"
                                key={order.cartId}
                              >
                                <img
                                  src={order.productImgUrl}
                                  alt={order.productName}
                                  className="w-32 h-32 rounded-lg"
                                />
                                <div className="">
                                  <p className="text-white font-bold text-sm">
                                    Name: {order.productName}
                                  </p>
                                  <p className="text-white font-bold text-sm">
                                    Price: ${order.productPrice}
                                  </p>
                                  <p className="text-white font-bold text-sm">
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
                        <p>Tax: 5%</p>
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
    </>
  );
}

export default MyOrder;
