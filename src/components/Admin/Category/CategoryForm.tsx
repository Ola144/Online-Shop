/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { addCategory } from "../../../store/category-slice";

const CategoryForm = ({ closeCategoryForm }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading } = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch<any>();

  const createCategory = (productData: any) => {
    // console.log(productData);
    dispatch(addCategory(productData));
  };

  return (
    <div className="bg-black/50 flex justify-center items-center min-h-screen pb-10 pt-20 w-full absolute top-0 left-0 z-50">
      <div className="bg-white py-5 px-4 rounded-lg" style={{ width: 400 }}>
        <div className="flex justify-between items-center">
          <h5 className="text-xl">Create Category</h5>
          <span
            className="text-2xl cursor-pointer"
            onClick={() => closeCategoryForm()}
          >
            <i className="fa fa-close"></i>
          </span>
        </div>
        <form onSubmit={handleSubmit(createCategory)} className="w-full my-4">
          <div className="my-2">
            <label htmlFor="cateogryName" className="text-gray-500 font-bold">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              className={
                errors.categoryName
                  ? "w-full py-2 px-3 border-2 border-red-500 bg-gray-300 rounded-lg text-white placeholder:text-white "
                  : "w-full py-2 px-3 border-2 border-gray-500 bg-gray-300 rounded-lg text-white placeholder:text-white "
              }
              placeholder="Enter Category Name"
              {...register("categoryName", { required: true })}
            />
            {errors.categoryName && (
              <span className="text-red-500 text-sm text-muted">
                *Category Name is a required field!
              </span>
            )}
          </div>
          <div className="my-2">
            <label htmlFor="categoryImg" className="text-gray-500 font-bold">
              Category Image Url
            </label>
            <input
              type="text"
              id="categoryImg"
              className={
                errors.categoryImg
                  ? "w-full py-2 px-3 border-2 border-red-500 bg-gray-300 rounded-lg text-white placeholder:text-white"
                  : "w-full py-2 px-3 border-2 border-gray-500 bg-gray-300 rounded-lg text-white placeholder:text-white "
              }
              placeholder="Enter Category Image Url"
              {...register("categoryImg", { required: true })}
            />
            {errors.categoryImg && (
              <span className="text-red-500 text-sm text-muted">
                *Category Image Url is a required field!
              </span>
            )}
          </div>
          {!loading ? (
            <button
              className="w-full bg-gray-500 text-white text-center py-4 rounded-lg hover:bg-gray-400"
              type="submit"
            >
              Add Category
            </button>
          ) : (
            <button
              className="w-full bg-gray-300 text-white text-center py-4 rounded-lg flex justify-center items-center gap-1"
              disabled
            >
              Processing{" "}
              <span className="size-2 rounded-full p-2 border-4 border-white border-t-blue-400 animate-spin"></span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
