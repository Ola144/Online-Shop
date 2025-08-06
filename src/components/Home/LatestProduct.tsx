/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  get,
  getDatabase,
  limitToLast,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader";
import type { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createCartItem, deleteCartItem } from "../../store/cart-slice-api";
import { addLikeToDB, removerLikeFromDB } from "../../store/like-slice";
import { useUser } from "../../context/UserContext";

const LatestProduct = () => {
  const [product, setProduct] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { likeList } = useSelector((state: RootState) => state.like);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { userId } = useUser();

  useEffect(() => {
    getLatestProduct();
  }, []);

  const getLatestProduct = () => {
    setLoading(true);

    try {
      const database = getDatabase();
      const productRef = ref(database, "products");
      const q = query(productRef, orderByChild("date"), limitToLast(4));
      get(q).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const products = Object.values(data);
          setProduct(products);
          setLoading(false);
        } else if (!snapshot.exists()) {
          setLoading(false);
          setProduct([]);
        }
      });
    } catch (error: any) {
      setLoading(false);
      setProduct([]);
      toast.error(error.message);
    }
  };

  const handleLike = (productId: string) => {
    dispatch(addLikeToDB(productId));
  };

  const handleUnlike = () => {
    let id: any;
    likeList.find((item) => {
      id = item.value.likeId;
    });
    dispatch(removerLikeFromDB(id));
  };

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
    <div className="w-full px-10 shadow-lg pt-10 pb-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-blue-600 font-bold">Latest Products</h2>
        <button
          className="underline text-blue-500 hover:underline-offset-0 text-lg font-bold"
          onClick={() => navigate("/products")}
        >
          View All Products
        </button>
      </div>
      <>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 px-16 sm:px-0 md:px-0 gap-3 mt-5">
            {product.map((product: any) => {
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
                  <div className="flex justify-between">
                    <p className="text-gray-500 text-sm text-left">
                      {product.productCategory}
                    </p>
                    <p className="text-xl text-red-500 font-black">
                      {likeList.some(
                        (like: any) =>
                          like.value.productId === product.productId &&
                          like.value.userId === userId
                      ) ? (
                        <i
                          className="fa fa-heart cursor-pointer"
                          onClick={() => handleUnlike()}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-heart-o cursor-pointer"
                          onClick={() => handleLike(product.productId)}
                        ></i>
                      )}
                    </p>
                  </div>
                  <div className="mt-2">
                    <h5 className="text-lg font-bold">{product.productName}</h5>
                    <p className="text-lg font-medium">
                      ${product.productPrice}
                    </p>
                    <div className="flex justify-center items-center gap-1">
                      <div>
                        {cartItems?.some(
                          (p: any) => p.productId === product.productId
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
    </div>
  );
};

export default LatestProduct;
