import ProductCard from "./ProductCard";

function Products() {
  const removeDeleteBtn = {
    display: "none",
  };

  return (
    <div className="px-4 py-5 my-5">
      <h1 className="text-3xl font-bold mb-5">All Products</h1>
      <ProductCard removeDeleteBtn={removeDeleteBtn} />
    </div>
  );
}

export default Products;
