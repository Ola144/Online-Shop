import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { addProduct } from "../../../store/product-slice";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface IProduct {
  productName: string;
  productImgUrl: string;
  productCategory: string;
  productDesc: string;
  productPrice: number;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const ProductForm = ({ closeProductForm }: any) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({
    defaultValues: {
      productName: "",
      productCategory: "",
      productDesc: "",
      productImgUrl: "",
      productPrice: 0,
    },
  });

  const dispatch = useDispatch<any>();
  const { loading } = useSelector((state: RootState) => state.product);
  const { categoryList }: any = useSelector(
    (state: RootState) => state.category
  );

  const createProduct = (productData: any) => {
    dispatch(addProduct(productData));
  };

  return (
    <div className="bg-black/50 flex justify-center items-center min-h-screen pb-10 pt-20 w-full absolute top-0 left-0 z-50">
      <div
        className="bg-white py-5 px-4 rounded-lg overflow-y-auto h-96"
        style={{ width: 500 }}
      >
        <div className="flex justify-between items-center">
          <h5 className="text-xl">Create Product</h5>
          <span
            className="text-2xl cursor-pointer"
            onClick={() => closeProductForm()}
          >
            <i className="fa fa-close"></i>
          </span>
        </div>
        <form onSubmit={handleSubmit(createProduct)} className="w-full my-4">
          <div className="my-2">
            <label htmlFor="productName" className="text-gray-500 font-bold">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              className={
                errors.productName
                  ? "w-full py-2 px-3 border-2 border-red-500 bg-gray-300 rounded-lg text-white placeholder:text-white "
                  : "w-full py-2 px-3 border-2 border-gray-500 bg-gray-300 rounded-lg text-white placeholder:text-white "
              }
              placeholder="Enter Product Name"
              {...register("productName", { required: true })}
            />
            {errors.productName && (
              <span className="text-red-500 text-sm text-muted">
                *Product Name is a required field!
              </span>
            )}
          </div>
          <div className="flex justify-center items-center w-full gap-1">
            <div className="my-2 w-96">
              <label htmlFor="productPrice" className="text-gray-500 font-bold">
                Product Price
              </label>
              <input
                type="number"
                id="productPrice"
                className={
                  errors.productPrice
                    ? "w-fit py-2 px-3 border-2 border-red-500 bg-gray-300 rounded-lg text-white placeholder:text-white placeholder:text-sm"
                    : "w-fit py-2 px-3 border-2 border-gray-500 bg-gray-300 rounded-lg text-white placeholder:text-white placeholder:text-sm"
                }
                placeholder="Enter Product Price"
                {...register("productPrice", { required: true })}
              />
              {errors.productPrice && (
                <span className="text-red-500 text-xs text-muted">
                  *Product price is a required field!
                </span>
              )}
            </div>
            <div className="my-2 w-96">
              <label
                htmlFor="productCategory"
                className="text-gray-500 font-bold"
              >
                Product Category
              </label>
              <select
                id="productCategory"
                className={
                  errors.productCategory
                    ? "w-fit py-2 px-3 border-2 border-red-500 bg-gray-300 rounded-lg text-white placeholder:text-white placeholder:text-sm"
                    : "w-fit py-2 px-3 border-2 border-gray-500 bg-gray-300 rounded-lg text-white placeholder:text-white placeholder:text-sm"
                }
                {...register("productCategory", { required: true })}
              >
                <option value="">Select Product Category</option>
                {categoryList.map((category: any) => {
                  return (
                    <option
                      key={category.categoryId}
                      value={category.categoryName}
                    >
                      {category.categoryName}
                    </option>
                  );
                })}
              </select>
              {errors.productCategory && (
                <span className="text-red-500 text-xs text-muted">
                  *Product Category is a required field!
                </span>
              )}
            </div>
          </div>
          <div className="my-2">
            <label htmlFor="productName" className="text-gray-500 font-bold">
              Product Image Url
            </label>
            <input
              type="text"
              id="productName"
              className={
                errors.productImgUrl
                  ? "w-full py-2 px-3 border-2 border-red-500 bg-gray-300 rounded-lg text-white placeholder:text-white "
                  : "w-full py-2 px-3 border-2 border-gray-500 bg-gray-300 rounded-lg text-white placeholder:text-white "
              }
              placeholder="Enter Product Image Url"
              {...register("productImgUrl", { required: true })}
            />
            {errors.productImgUrl && (
              <span className="text-red-500 text-sm text-muted">
                *Product Image Url is a required field!
              </span>
            )}
          </div>
          <div className="my-2">
            <label htmlFor="productDesc" className="text-gray-500 font-bold">
              Product Description
            </label>
            <Controller
              name="productDesc"
              control={control}
              rules={{ required: "*Product Description is a required field!" }}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <ReactQuill
                      theme="snow"
                      value={field.value || ""}
                      onChange={(content) => field.onChange(content)}
                      onBlur={field.onBlur}
                    />

                    {fieldState.error && (
                      <span className="text-red-500 text-sm text-muted">
                        {fieldState.error?.message}
                      </span>
                    )}
                  </>
                );
              }}
            />
          </div>
          {!loading ? (
            <button
              className="w-full bg-gray-500 text-white text-center py-4 rounded-lg hover:bg-gray-400"
              type="submit"
            >
              Add Product
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

export default ProductForm;
