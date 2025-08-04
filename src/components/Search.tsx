/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { useState } from "react";
import { useNavigate } from "react-router";
import { fetchCategory } from "../store/category-slice";

const Search = ({ setSearchBar }: any) => {
  //   const [filterCategory, setFilterCategory] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");

  const { categoryList } = useSelector((state: RootState) => state.category);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const filteredItem = categoryList.filter((item) =>
    item.categoryName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div
      className="absolute top-1 md:top-2 z-50 transition-all search"
      style={{ right: 110 }}
    >
      <input
        type="text"
        className="w-80 border-2 border-black bg-gray-400 rounded-lg py-2 px-3 text-white placeholder:text-white"
        placeholder="Search by category..."
        onChange={(e: any) => {
          setSearchText(e.target.value);
        }}
      />
      {searchText === "" ? (
        <></>
      ) : (
        <div className="flex justify-center flex-col items-center">
          {filteredItem.map((category: any) => (
            <div
              key={category.categoryId}
              className="w-40 mb-1 flex justify-center items-start bg-gray-400 text-white rounded-lg p-2 cursor-pointer"
              onClick={() => {
                dispatch(fetchCategory());
                navigate(`/category/${category.categoryName}`);

                setSearchBar(false);
              }}
            >
              <img
                src={category.categoryImg}
                alt={category.categoryName}
                className="w-12 h-12 mr-1"
              />
              <h5>{category.categoryName}</h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
