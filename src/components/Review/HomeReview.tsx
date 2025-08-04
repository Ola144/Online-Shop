import { useEffect, useState } from "react";
import { databases } from "../../appwrite/appwrite";
import { toast } from "react-toastify";
import { Query } from "appwrite";
import Loader from "../Loader";
import { useNavigate } from "react-router";

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

console.log(databaseId, collectionId);

const HomeReview = () => {
  const [review, setReview] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    getReview();
  }, []);

  const getReview = async () => {
    setLoading(true);

    try {
      const response = await databases.listDocuments(
        databaseId, // Database ID
        collectionId, // Collection ID
        [Query.orderDesc("$createdAt"), Query.limit(4)]
      );
      const data = response.documents || [];
      const dataArr = Object.values(data);
      setReview(dataArr);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {review.length === 0 ? (
        <></>
      ) : (
        <div className="px-10">
          <div className="text-center mt-10 mb-5">
            <h1 className="text-blue-500 font-black text-4xl">Testimonial</h1>
            <h3 className="text-2xl font-bold">
              What Our{" "}
              <span className="text-blue-500 font-black">Customers</span> Are
              Saying
            </h3>
            <div className="flex justify-end my-4">
              <button
                className="underline text-blue-500 hover:underline-offset-0 text-lg font-bold"
                onClick={() => navigate("/review")}
              >
                View All Review
              </button>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <>
              {review.length === 0 ? (
                <>
                  <h1 className="text-center text-red-500 font-black text-xl">
                    There is no review yet!
                  </h1>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
                  {review.map((item) => (
                    <div
                      key={item.$id}
                      className="shadow-lg bg-white text-black p-3 text-center mx-auto w-full rounded-lg"
                    >
                      <img
                        src={item.userImg}
                        alt={item.fullName}
                        className="w-20 h-20 rounded-full mx-auto mb-1"
                      />
                      <p className="text-gray-600 font-black text-xl mb-2">
                        {item.fullName}
                      </p>
                      <hr className="w-24 mt-6 h-1 bg-blue-600 mx-auto mb-4" />
                      <p className="text-sm px-3 text-gray-600">
                        {item.plainReview}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default HomeReview;
