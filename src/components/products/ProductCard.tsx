/* eslint-disable @typescript-eslint/no-explicit-any */

import { useDispatch, useSelector } from "react-redux";
import { createCartItem, deleteCartItem } from "../../store/cart-slice-api";
import type { RootState } from "../../store";
import { useEffect } from "react";
import { deleteProduct, fetchProduct } from "../../store/product-slice";
import { useNavigate } from "react-router";
import Loader from "../Loader";

function ProductCard({ removeCartBtn, removeDeleteBtn }: any) {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { productList, loading } = useSelector(
    (state: RootState) => state.product
  );

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const addToCart = (item: any) => {
    // dispatch(cartActions.addTocart(item));

    // let user;
    // const localUser = localStorage.getItem("users");
    // if (localUser != null) user = JSON.parse(localUser);

    // const productRef = collection(fireDB, "cartItems");
    // const productDocRef: DocumentReference = doc(productRef);
    // const productWithId = {
    //   productId: productDocRef.id,
    //   userId: user.uid,
    //   date: new Date().toLocaleString("en-Us", {
    //     day: "2-digit",
    //     month: "short",
    //     year: "numeric",
    //   }),
    //   ...item,
    // };
    // await setDoc(productDocRef, productWithId);
    // toast.success("Product Added To Cart!");

    dispatch(createCartItem(item));
  };

  const removeProduct = (productId: string) => {
    dispatch(deleteProduct(productId));
  };

  const deleteFromCart = () => {
    let id: any;

    cartItems.find((item) => {
      id = item.cartId;
    });
    dispatch(deleteCartItem(id));
  };

  useEffect(() => {
    dispatch(fetchProduct());

    // localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 px-16 sm:px-0 md:px-0 gap-3 mt-5">
          {productList.map((product) => {
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
                  <h5 className="text-lg font-bold">{product.productName}</h5>
                  <p className="text-lg font-medium">${product.productPrice}</p>
                  <div className="flex justify-center items-center gap-1">
                    <div style={removeCartBtn}>
                      {cartItems?.some(
                        (p: any) =>
                          p.cartItemData.productId === product.productId
                      ) ? (
                        <button
                          className="mt-5 w-auto bg-red-500 hover:bg-red-400  text-white py-2 px-4 rounded-lg sm:text-xs md:text-sm"
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
                    <div style={removeDeleteBtn}>
                      {!loading ? (
                        <button
                          className="mt-5 w-auto bg-red-600 hover:bg-red-400 text-white py-2 px-4 rounded-lg sm:text-xs md:text-sm"
                          onClick={() => removeProduct(product.productId)}
                        >
                          Delete
                        </button>
                      ) : (
                        <div className="flex justify-center">
                          <button
                            className="mt-5 w-auto bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed flex justify-center gap-1 sm:text-xs md:text-sm
                      "
                            disabled
                          >
                            Processing{" "}
                            <span className="size-4 p-2 border-4 border-t-blue-400 animate-spin border-white rounded-full"></span>
                          </button>
                        </div>
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
  );
}

export default ProductCard;
