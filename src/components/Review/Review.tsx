import React from "react";
import ReviewCard from "./ReviewCard";

const Review = () => {
  const removeDeleteBtn = {
    display: "none",
  };

  return <ReviewCard removeDeleteBtn={removeDeleteBtn} />;
};

export default Review;
