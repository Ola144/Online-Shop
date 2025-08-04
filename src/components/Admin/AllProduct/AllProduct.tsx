import { useState } from "react";
import ProductForm from "./ProductForm";
import CategoryForm from "../Category/CategoryForm";
import ProductCard from "../../products/ProductCard";

const AllProduct = () => {
  const [isShowProductForm, setIsShowProductForm] = useState<boolean>(false);
  const [isShowCategoryForm, setIsShowCategoryForm] = useState<boolean>(false);

  const showProductForm = () => {
    window.scrollTo(0, 0);
    setIsShowProductForm(true);
  };

  const closeProductForm = () => {
    setIsShowProductForm(false);
  };

  const showCategoryForm = () => {
    window.scrollTo(0, 0);
    setIsShowCategoryForm(true);
  };

  const closeCategoryForm = () => {
    setIsShowCategoryForm(false);
  };

  const removeCartBtn = {
    display: "none",
  };

  return (
    <>
      <div className="mt-10 pb-10 px-10 mx-auto">
        <div className="flex justify-end gap-1 mx-auto">
          <button
            className="w-fit text-white bg-red-500 rounded-lg border-1 hover:bg-red-400 py-3 px-4"
            onClick={() => showProductForm()}
          >
            Add Product
          </button>
          <button
            className="w-fit text-white bg-red-500 rounded-lg border-1 hover:bg-red-400 py-3 px-4"
            onClick={() => showCategoryForm()}
          >
            Add Category
          </button>
        </div>
      </div>
      <div className=" px-10 py-5 bg-gray-50 mx-auto">
        <ProductCard removeCartBtn={removeCartBtn} />
      </div>
      {isShowProductForm && <ProductForm closeProductForm={closeProductForm} />}
      {isShowCategoryForm && (
        <CategoryForm closeCategoryForm={closeCategoryForm} />
      )}
    </>
  );
};

export default AllProduct;
