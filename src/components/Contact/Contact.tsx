import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ContactForm from "./ContactForm";
import ReviewForm from "./ReviewForm";

const Contact = () => {
  return (
    <div className="py-10 px-8 mx-auto">
      <div className="relative">
        <div className="text-center  text-white md:text-3xl text-xl font-black py-16 bg-[url('/assets/contact-bg.jpg')] bg-cover bg-no-repeat bg-center h-64 w-full ">
          <h1 className="uppercase py-2 border-t-2 border-b-2 border-white h-fit w-fit mx-auto relative to-black/50 z-20">
            Contact us
          </h1>
        </div>
        <div className="w-full bg-black/50 h-64 absolute top-0 left-0 "></div>
      </div>

      <div className="flex justify-between flex-col md:flex-row items-start my-10 gap-5 md:gap-0 ">
        <div className="w-full">
          <Tabs>
            <TabList className="text-sm flex gap-2 bg-gray-500 w-fit rounded-lg">
              <Tab
                className=" text-white w-fit py-2 px-3 rounded-lg cursor-pointer"
                selectedClassName="contactActiveBtn"
              >
                Contact Us
              </Tab>
              <Tab
                className=" text-white w-fit py-2 px-3 rounded-lg  cursor-pointer"
                selectedClassName="contactActiveBtn"
              >
                Send Your Review
              </Tab>
            </TabList>
            <TabPanel className="w-full">
              <ContactForm />
            </TabPanel>
            <TabPanel>
              <ReviewForm />
            </TabPanel>
          </Tabs>
        </div>

        <div className="p-5 text-center border-8 border-gray-400 h-fit  w-full customerCare shadow-inner shadow-gray-900">
          <h1 className="text-xl font-mono mb-3 font-bold">
            OUR CUSTOMER CARE
          </h1>
          <hr className="bg-gray-400 w-12 h-1 mb-5 mx-auto" />
          <h1 className="text-xl mb-3 text-gray-400">
            <i className="fa fa-phone"></i> +234 81 333 333 33
          </h1>
          <hr className="bg-gray-400 w-12 h-1 mb-5 mx-auto" />
          <h5 className="font-black uppercase text-lg">Online Shopping</h5>
          <p className="text-gray-500">P.O 1110</p>
          <p className="text-gray-500">Owings Mills, MD, 21117</p>
          <p className="text-gray-500">info@onlineshopping.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
