/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { createCartItem, deleteCartItem } from "../../store/cart-slice-api";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { getRelatedCategoryProduct } from "../../store/product-slice";
import Loader from "../Loader";

const RelatedProduct = ({ categoryName }: any) => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { relatedProductList, loading } = useSelector(
    (state: RootState) => state.product
  );

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { id }: any = useParams();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getRelatedCategoryProduct(categoryName, id));
    }, 3000);
  }, [dispatch, categoryName, id]);

  const addToCart = (item: any) => {
    dispatch(createCartItem(item));
  };

  const deleteFromCart = () => {
    let id: any;

    cartItems.find((item) => {
      id = item.cartId;
    });
    dispatch(deleteCartItem(id));
  };

  return (
    <div className="w-full px-10 shadow-lg pt-2 pb-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-blue-600 font-bold">Related Products</h2>
        <button
          className="underline text-blue-500 hover:underline-offset-0 text-lg font-bold"
          onClick={() => navigate("/products")}
        >
          View All Products
        </button>
      </div>
      {relatedProductList.length === 0 ? (
        <h1 className="text-red-500 text-center mt-20 text-2xl">
          There is no related product for{" "}
          <span className="font-extrabold">{categoryName}</span> category!
        </h1>
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 px-16 sm:px-0 md:px-0 gap-3 mt-5">
              {relatedProductList.map((product: any) => {
                return (
                  <div
                    key={product.productId}
                    className="shadow-lg rounded-md p-4 text-center hover:shadow-2xl"
                  >
                    <img
                      src={product.productImgUrl}
                      alt={product.productName}
                      className="w-full rounded-md sm:h-60 h-80"
                    />
                    <p className="text-gray-500 text-sm text-left">
                      {product.productCategory}
                    </p>
                    <div className="mt-2">
                      <h5 className="text-lg font-bold">
                        {product.productName}
                      </h5>
                      <p className="text-lg font-medium">
                        ${product.productPrice}
                      </p>
                      <div className="flex justify-center items-center gap-1">
                        <div>
                          {cartItems?.some(
                            (p: any) =>
                              p.cartItemData.productId === product.productId
                          ) ? (
                            <button
                              className="mt-5 w-auto bg-red-500 hover:bg-red-400  text-white py-2 px-4 rounded-lg  sm:text-xs md:text-sm"
                              onClick={() => deleteFromCart()}
                            >
                              Delete From Cart
                            </button>
                          ) : (
                            <button
                              className="mt-5 w-auto bg-gray-600 hover:bg-gray-400 text-white py-2 px-4 rounded-lg sm:text-xs md:text-sm"
                              onClick={() => addToCart(product)}
                            >
                              Add To Cart
                            </button>
                          )}
                        </div>

                        <div>
                          <button
                            className="mt-5 w-auto bg-green-600 hover:bg-green-400 text-white py-2 px-4 rounded-lg sm:text-xs md:text-sm"
                            onClick={() =>
                              navigate(`/productDetails/${product.productId}`)
                            }
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RelatedProduct;
