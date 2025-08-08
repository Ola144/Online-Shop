/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import Loader from "../Loader";

const AllUser = () => {
  const { userList, status } = useSelector((state: RootState) => state.user);

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto my-5 mx-auto px-5">
          <table className="w-full mb-10 table-auto mx-auto text-sm">
            <thead className="border-2 border-gray-500 text-white bg-black py-10">
              <tr className="">
                <th className="border-2 border-gray-500 px-1">S/N</th>
                <th className="border-2 border-gray-500 py-2">Name</th>
                <th className="border-2 border-gray-500 py-2">Email</th>
                <th className="border-2 border-gray-500 py-2">Date</th>
                <th className="border-2 border-gray-500 py-2">Role</th>
                <th className="border-2 border-gray-500 py-2">Password</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {userList.map((user: any, index) => {
                return (
                  <tr key={user.uid}>
                    <td className="border-2 border-gray-500">{index + 1}.</td>
                    <td className="border-2 border-gray-500 px-2">
                      {user.name}
                    </td>
                    <td className="border-2 border-gray-500 px-2">
                      {user.email}
                    </td>
                    <td className="border-2 border-gray-500 px-2">
                      {user.date}
                    </td>
                    <td className="border-2 border-gray-500 px-2">
                      {user.role}
                    </td>
                    <td className="border-2 border-gray-500 px-2">
                      {user.password}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AllUser;
