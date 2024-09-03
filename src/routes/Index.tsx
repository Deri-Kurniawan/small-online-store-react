import ProductList, { ProductListSkeleton } from "@/components/ProductList";
import { fetchProducts } from "@/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect } from "react";

const IndexPage = () => {
  const { products, status, error } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      {status === "idle" || (status === "pending" && <ProductListSkeleton />)}

      {status === "succeeded" && (
        <>
          {products.length > 0 ? (
            <ProductList />
          ) : (
            <div className="alert alert-warning" role="alert">
              No products
            </div>
          )}
        </>
      )}

      {status === "rejected" && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default IndexPage;
