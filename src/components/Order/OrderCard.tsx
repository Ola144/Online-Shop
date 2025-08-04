/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import Payment from "./Payment";

const OrderCard = () => {
  const { showOrderCard } = useSelector((state: RootState) => state.order);

  return (
    <div>
      {showOrderCard && (
        <div className="bg-black/50 absolute top-0 left-0 w-full min-h-screen text-white z-40 flex justify-center items-center transition-al cursor-pointer">
          <div className="w-96 h-fit bg-white text-black text-center rounded-lg py-4 px-4">
            <h2 className="font-bold text-xl mb-3">
              Order Has Placed Successfully!!!
            </h2>
            <p className="text-2xl text-red-500 font-bold">
              Thank you for your patronage.
            </p>
            <p className="my-2 text-gray-500 text-muted">
              Click on button below to make payment
            </p>
            <div className="flex justify-center items-center">
              {/* <button
                className="w-24 py-3 px-2 text-white bg-red-600 hover:bg-red-400 rounded-lg flex justify-center gap-1 items-center"
                onClick={() => navigate("/payment")}
              >
                Pay <i className="fa fa-money"></i>
              </button> */}
              <Payment />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
