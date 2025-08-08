/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useNavigate } from "react-router";

const Hero = () => {
  const { categoryList }: any = useSelector(
    (state: RootState) => state.category
  );
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gray-300" style={{ width: "100%" }}>
        <div className="mx-auto hero">
          <div className="flex items-center justify-center flex-wrap sm:flex-nowrap hero-flex px-4 py-5 sm:gap-0 gap-4">
            <div className="text-center sm:text-left w-full">
              <h1 className="font-bold text-sm lg:text-5xl md:text-3xl sm:text-3xl ">
                Welcome To <br />
                Our Store
              </h1>
              <p className="sm:text-lg lg:text-lg text-sm font-mono">
                Discover a wide range of products <br /> at unbeatable prices.
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold w-fit py-2 px-2 mt-3 rounded-lg text-sm md:text-lg"
                onClick={() => navigate("/products")}
              >
                Shop Now
              </button>
            </div>
            <div className="w-full">
              <img
                src="assets/ecommercehero.png"
                alt="Hero Image"
                className="hero-img"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 mx-auto overflow-auto w-full ">
        <div className="flex justify-center items-center cursor-pointer px-10 mx-auto">
          {categoryList.map((category: any) => {
            return (
              <div
                key={category.categoryId}
                className="text-center font-bold px-2"
                onClick={() => navigate(`/category/${category.categoryName}`)}
              >
                <img
                  src={category.categoryImg}
                  alt={category.categoryName}
                  className="w-40 lg:w-28 md:h-20 h-10 mb-2 hover:shadow-sm"
                />
                <h5 className="text-xs">{category.categoryName}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Hero;
