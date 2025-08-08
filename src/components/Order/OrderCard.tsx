/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import Payment from "./Payment";
import { closeOrderCard } from "../../store/order-slice";

const OrderCard = () => {
  const { showOrderCard } = useSelector((state: RootState) => state.order);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<any>();

  const totalPrice = cartItems
    ?.map((item: any) => Number(item.productPrice) * item.productQty)
    .reduce((prevValue: any, currValue: any) => prevValue + currValue, 0);

  let grandTotalPriceWithTax = 0;

  grandTotalPriceWithTax = (totalPrice + 100).toFixed(2);

  return (
    <div>
      {showOrderCard && (
        <div
          onClick={() => dispatch(closeOrderCard())}
          className="bg-black/50 absolute top-0 left-0 w-full min-h-screen text-white z-40 flex justify-center items-center transition-al cursor-pointer"
        >
          <div className="w-72 md:w-96 h-fit bg-white text-black text-center rounded-lg py-4 px-4">
            <h2 className="font-bold text-sm md:text-xl mb-3">
              Order Has Placed Successfully!!!
            </h2>
            <p className="text-sm md:text-xl text-red-500 font-bold">
              Thank you for your patronage.
            </p>
            <p className="my-2 text-gray-500 text-muted text-sm ">
              Click on button below to make payment of{" "}
              <span className="font-black text-red-500">
                ${grandTotalPriceWithTax}
              </span>
            </p>
            <div className="flex justify-center items-center">
              <Payment />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
