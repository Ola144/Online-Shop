/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DataSnapshot,
  equalTo,
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref,
  type Query,
} from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { createCartItem, deleteCartItem } from "../../store/cart-slice-api";
import type { RootState } from "../../store";
import RelatedProduct from "./RelatedProduct";
import { addLikeToDB, removerLikeFromDB } from "../../store/like-slice";
import { useUser } from "../../context/UserContext";

const ProductDetails = () => {
  const { id }: any = useParams();
  const [product, setProduct] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>();

  const dispatch = useDispatch<any>();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { likeList } = useSelector((state: RootState) => state.like);
  const { userId } = useUser();

  useEffect(() => {
    geProductDetails();
  }, []);

  const geProductDetails = async () => {
    setLoading(true);
    try {
      const database = getDatabase();
      const productRef = ref(database, "products");
      const q: Query = query(
        productRef,
        orderByChild("productId"),
        equalTo(id)
      );

      const unsubscribe = onValue(q, (snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val()); // Convert object to array
          setProduct(data);

          data.find((product: any) => {
            setCategoryName(product.productCategory);
          });
          setLoading(false);
        } else {
          toast.error("The Product Doesn't Exist!");
          setProduct([]);
          setLoading(false);
        }
      });

      return () => unsubscribe(); //Cleanup listener
    } catch (error: any) {
      console.log(error);
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

  const deleteFromCart = () => {
    let id: any;

    cartItems.find((item) => {
      id = item.cartId;
    });
    dispatch(deleteCartItem(id));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-3/4 mx-auto mt-4 pb-20">
          <h1 className="text-center font-bold mb-5 text-2xl">
            Product Details
          </h1>
          {product.map((item: any) => (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:gap-20 gap-10"
              key={item.productId}
            >
              <div className="relative">
                <img
                  src={item.productImgUrl}
                  alt={item.productName}
                  className="w-full rounded-md"
                />
                <p className="text-xl text-red-500 font-black absolute right-0 bottom-0 bg-white p-1 rounded-tl-lg">
                  {likeList.some(
                    (like: any) =>
                      like.value.productId === item.productId &&
                      like.value.userId === userId
                  ) ? (
                    <i
                      className="fa fa-heart cursor-pointer"
                      onClick={() => handleUnlike()}
                    ></i>
                  ) : (
                    <i
                      className="fa fa-heart-o cursor-pointer"
                      onClick={() => handleLike(item.productId)}
                    ></i>
                  )}
                </p>
              </div>
              <div className="text-gray-500 text-lg">
                <p className="mb-2 font-black text-2xl">{item.productName} </p>
                <p className="mb-2">{item.productCategory} </p>
                <p className="mb-2">${item.productPrice} </p>
                <p className="mb-2 text-justify" style={{ lineHeight: 2 }}>
                  {item.productDesc}{" "}
                </p>
                {cartItems.find((p: any) => p.productId === item.productId) ? (
                  <button
                    className="w-full bg-red-500 hover:bg-red-400 text-white py-4 rounded-lg mt-3 "
                    onClick={() => deleteFromCart()}
                  >
                    Delete From Cart
                  </button>
                ) : (
                  <button
                    className="w-full bg-gray-500 hover:bg-gray-400 text-white py-4 rounded-lg mt-3"
                    onClick={() => addToCart(item)}
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <RelatedProduct categoryName={categoryName} />
    </div>
  );
};

export default ProductDetails;
