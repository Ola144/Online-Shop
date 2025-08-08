import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useEffect } from "react";
import { getContact } from "../../store/contact-slice";
import Loader from "../Loader";

const AllContact = () => {
  const { contactList, loading } = useSelector(
    (state: RootState) => state.contact
  );
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  return (
    <div className="w-full my-10">
      <h1 className="text-gray-500 font-black text-xl ml-2 md:text-2xl my-4">
        All Feedback
      </h1>
      <div className="mx-auto w-full">
        {contactList.length === 0 ? (
          <>
            <h1 className="text-red-500 text-center font-bold text-3xl">
              There is no feedback yet!
            </h1>
          </>
        ) : (
          <>
            {loading ? (
              <Loader />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full mx-auto md:px-10 px-5 sm:px-5 gap-5">
                {contactList.map((item) => (
                  <div
                    key={item.contactId}
                    className="bg-white shadow-lg text-gray-400 p-4 w-full rounded-lg"
                  >
                    <div className="flex gap-8 mb-2">
                      <p className="font-black text-black">Name:</p>
                      <p>{item.fullName}</p>
                    </div>
                    <div className="flex gap-9 mb-2">
                      <p className="font-black text-black">Email:</p>
                      <p>{item.emailId}</p>
                    </div>
                    <div className="flex gap-5 mb-2">
                      <p className="font-black text-black">Subject:</p>
                      <p>{item.subject}</p>
                    </div>
                    <div className="flex gap-3 mb-2">
                      <p className="font-black text-black text-justify text-wrap">
                        Message:
                      </p>
                      <p>{item.plainMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllContact;
