import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import AllOrder from "./AllOrder";
import AllUser from "./AllUser";
import AllProduct from "./AllProduct/AllProduct";
import ReviewCard from "../Review/ReviewCard";
import AllContact from "./AllContact";
import { useUser } from "../../context/UserContext";

const Admin = () => {
  const { users } = useUser();

  const { allOrderItems } = useSelector((state: RootState) => state.order);
  const { userList } = useSelector((state: RootState) => state.user);
  const { productList } = useSelector((state: RootState) => state.product);
  const { reviewList } = useSelector((state: RootState) => state.review);
  const { contactList } = useSelector((state: RootState) => state.contact);

  return (
    <>
      <div className="w-3/4 py-5 text-center mt-20 mx-auto bg-gradient-to-tr from-gray-500 via-gray-700 to-gray-800 rounded-lg text-white text-2xl font-serif border-4 border-gray-600">
        <h2>Admin Dashboard</h2>
      </div>
      <div className="w-3/4 py-5 text-center mt-2 mx-auto bg-gradient-to-tr from-gray-500 via-gray-700 to-gray-800 rounded-lg text-white font-serif border-4 border-gray-600">
        <p>Name: {users?.name}</p>
        <p>Email: {users?.email}</p>
        <p>Role: {users?.role}</p>
        <p>Password: {users?.password}</p>
        <p>Date: {users?.date}</p>
      </div>

      <div className="w-full my-5">
        <Tabs>
          <TabList className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-1 w-fit mx-auto">
            <Tab
              selectedClassName="activ-tab"
              className="cursor-pointer w-52 h-32 lg:w-40 md:w-42 py-2 text-center my-1 mx-auto bg-gradient-to-tr from-gray-500 via-gray-700 to-gray-800 rounded-lg text-white font-serif border-4 border-gray-600"
            >
              <div className="text-3xl mb-1">
                <i className="fa fa-shopping-basket"></i>
              </div>
              <p className="mb-1 text-3xl">{productList.length}</p>
              <p className="text-sm">Total Products</p>
            </Tab>
            <Tab
              selectedClassName="activ-tab"
              className="cursor-pointer w-52 h-32 lg:w-40 md:w-42 py-2 text-center my-1 mx-auto bg-gradient-to-tr from-gray-500 via-gray-700 to-gray-800 rounded-lg text-white font-serif border-4 border-gray-600"
            >
              <div className="text-3xl mb-1">
                <i className="fa fa-th-list"></i>
              </div>
              <p className="mb-1 text-3xl">{allOrderItems.length}</p>
              <p className="text-sm">Total Order</p>
            </Tab>
            <Tab
              selectedClassName="activ-tab"
              className="cursor-pointer w-52 h-32 lg:w-40 md:w-42 py-2 text-center my-1 mx-auto bg-gradient-to-tr from-gray-500 via-gray-700 to-gray-800 rounded-lg text-white font-serif border-4 border-gray-600"
            >
              <div className="text-3xl mb-1">
                <i className="fa fa-users"></i>
              </div>
              <p className="mb-1 text-3xl">{userList.length}</p>
              <p className="text-sm">Total User</p>
            </Tab>
            <Tab
              selectedClassName="activ-tab"
              className="cursor-pointer w-52 h-32 lg:w-40 md:w-42 py-2 text-center my-1 mx-auto bg-gradient-to-tr from-gray-500 via-gray-700 to-gray-800 rounded-lg text-white font-serif border-4 border-gray-600"
            >
              <div className="text-3xl mb-1">
                <i className="fa fa-sticky-note"></i>
              </div>
              <p className="mb-1 text-3xl">{reviewList.length}</p>
              <p className="text-sm">Total Review</p>
            </Tab>
            <Tab
              selectedClassName="activ-tab"
              className="cursor-pointer w-52 h-32 lg:w-40 md:w-42 py-2 text-center my-1 mx-auto bg-gradient-to-tr from-gray-500 via-gray-700 to-gray-800 rounded-lg text-white font-serif border-4 border-gray-600"
            >
              <div className="text-3xl mb-1">
                <i className="fa fa-file-text"></i>
              </div>
              <p className="mb-1 text-3xl">{contactList.length}</p>
              <p className="text-sm">Total Feedback</p>
            </Tab>
          </TabList>

          <TabPanel>
            <AllProduct />
          </TabPanel>
          <TabPanel>
            <AllOrder />
          </TabPanel>
          <TabPanel>
            <AllUser />
          </TabPanel>
          <TabPanel>
            <ReviewCard />
          </TabPanel>
          <TabPanel>
            <AllContact />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default Admin;
