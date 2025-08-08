import { useNavigate } from "react-router";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-gradient-to-tl from-pink-50 to-pink-100 py-10 px-10 md:px-10">
      <h1 className="text-center font-black font-serif text-2xl my-2 ">
        {" "}
        About Us
      </h1>
      <div className="bg-white p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-fit md:gap-5 lg:gap-0 gap-5 items-start h-fit">
          <div className="col-span-1 w-fit">
            <img
              src="assets/ceo.jpg"
              alt="CEO"
              className="lg:w-52 md:w-full w-full relative lg:left-12 xl:left-32 md:left-0 left-0"
            />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-2 w-fit">
            <p className="mb-2 text-justify text-sm font-mono">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur, consequuntur vel commodi, veritatis voluptate
              laboriosam necessitatibus placeat corrupti voluptatum quis illo
              expedita itaque dignissimos nihil autem sequi velit quos totam
              possimus. Odit magni, quod nam rem veniam cum quasi non!
            </p>
            <p className="mb-2 text-justify text-sm font-mono">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur, consequuntur vel commodi, veritatis voluptate
              laboriosam necessitatibus placeat corrupti voluptatum quis illo
              expedita itaque dignissimos nihil autem sequi velit quos totam
              possimus. Odit magni, quod nam rem veniam cum quasi non!
            </p>
            <p className="mb-2 text-justify text-sm font-mono">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur, consequuntur vel commodi, veritatis voluptate
              laboriosam necessitatibus placeat corrupti voluptatum quis illo
              expedita itaque dignissimos nihil autem sequi velit quos totam
              possimus. Odit magni, quod nam rem veniam cum quasi non!
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 my-10 md:gap-3 gap-10 items-center justify-center w-full">
        <div className="flex justify-start">
          <p className="me-3 text-lg md:text-xl text-gray-500">
            <i className="fa fa-phone-square"></i>
          </p>
          <div>
            <p className="text-black text-sm md:text-lg font-bold">Call Us:</p>
            <p className="text-pink-500 text-sm md:text-lg font-bold">
              0813333333333, 0804444444444
            </p>
          </div>
        </div>
        <div className="flex lg:justify-center justify-start">
          <p className="me-3 text-lg md:text-xl text-gray-500">
            <i className="fa fa-envelope-open-o"></i>
          </p>
          <div>
            <p className="text-black text-sm md:text-lg font-bold">
              Or Send E-mail:
            </p>
            <p className="text-pink-500 text-sm md:text-lg font-bold">
              onlineshopping@gamil.com
            </p>
          </div>
        </div>

        <div className="flex justify-start lg:justify-end">
          <div className="flex gap-3 mt-4">
            <span
              className="text-white text-xl bg-red-500 size-8 py-1 rounded-full text-center cursor-pointer"
              style={{ lineHeight: 1 }}
            >
              <i className="fa fa-facebook"></i>
            </span>
            <span
              className="text-white text-xl bg-red-500 size-8 py-1 rounded-full text-center cursor-pointer"
              style={{ lineHeight: 1 }}
            >
              <i className="fa fa-twitter"></i>
            </span>
            <span
              className="text-white text-xl bg-red-500 size-8 py-1 rounded-full text-center cursor-pointer"
              style={{ lineHeight: 1 }}
            >
              <i className="fa fa-youtube"></i>
            </span>
            <span
              className="text-white text-xl bg-red-500 size-8 py-1 rounded-full text-center cursor-pointer"
              style={{ lineHeight: 1 }}
            >
              <i className="fa fa-instagram"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 my-10 md:gap-3 gap-10 items-center justify-center w-full">
        <div className="col-span-1 lg:col-span-2 bg-green-600 py-10 px-2 lg:w-full w-fit mx-auto">
          <div className="flex lg:justify-between justify-center gap-4 lg:w-full w-fit">
            <div>
              <p className="text-black font-bold lg:text-lg text-xs md:text-sm mb-3">
                See why our customer love us
              </p>
              <h3 className="text-white lg:text-3xl text-sm md:text-lg font-bold">
                Customer Testimonials
              </h3>
            </div>
            <button
              className="bg-red-500 text-white text-xs h-8 px-2 w-18 rounded-lg font-bold hover:bg-red-400"
              onClick={() => navigate("/review")}
            >
              Take A Look
            </button>
          </div>
        </div>
        <div className="col-span-1 border-2 border-red-500 lg:p-8 p-7 text-center w-fit md:w-full mx-auto">
          <p className="font-black text-lg mb-2">Pay Securely Online</p>
          <p className="lg:text-2xl md:text-xl text-xl text-red-500 font-bold">
            <i className="fa fa-cc-mastercard mx-1"></i>
            <i className="fa fa-cc-visa mx-1"></i>
            <i className="fa fa-cc-paypal mx-1"></i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
