import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useEffect } from "react";
import { deleteRewiew, getReview } from "../../store/review-slice";
import Loader from "../Loader";

const ReviewCard = ({ removeDeleteBtn }: any) => {
  const { reviewList, loading } = useSelector(
    (state: RootState) => state.review
  );

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getReview());
  }, [dispatch]);

  const handleDeleteReview = (reviewId: string) => {
    dispatch(deleteRewiew(reviewId));
  };

  return (
    <div className="px-10">
      <div className="text-center mt-10 mb-5">
        <h1 className="text-blue-500 font-black text-xl md:text-2xl">
          Testimonial
        </h1>
        <h3 className="text-lg md:text-xl font-bold">
          What Our <span className="text-blue-500 font-black">Customers</span>{" "}
          Are Saying
        </h3>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {reviewList.length === 0 ? (
            <>
              <h1 className="text-center text-red-500 font-black text-xl">
                There is no review yet!
              </h1>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
              {reviewList.map((review) => (
                <div
                  key={review.$id}
                  className="shadow-lg bg-white text-black p-2 md:p-3 text-center mx-auto w-full rounded-lg"
                >
                  <img
                    src={review.userImg}
                    alt={review.fullName}
                    className="w-12 h-12 md:w-20 md:h-20 rounded-full mx-auto mb-1"
                  />
                  <p className="text-gray-600 font-black text-lg md:text-xl mb-2">
                    {review.fullName}
                  </p>
                  <hr className="w-24 mt-6 h-1 bg-blue-600 mx-auto mb-4" />
                  <p className="text-sm px-3 text-gray-600">
                    {review.plainReview}
                  </p>
                  <div
                    className="flex justify-end mt-3"
                    style={removeDeleteBtn}
                  >
                    {!loading ? (
                      <button
                        className="text-white bg-red-500 hover:bg-red-400 w-fit py-1 px-2 text-lg rounded-full"
                        onClick={() => handleDeleteReview(review.$id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    ) : (
                      <button
                        className="text-white bg-gray-400 hover:bg-gray-400 w-fit py-1 px-2 text-lg rounded-full cursor-no-drop flex justify-center"
                        disabled
                      >
                        <span className="size-4 p-2 border-4 border-white border-t-blue-400 rounded-full animate-spin"></span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewCard;
