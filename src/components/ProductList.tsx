import { useAppSelector } from "@/hooks";
import ProductQuantity from "./ProductQuantity";
import { Skeleton } from "./ui/skeleton";

const ProductList = () => {
  const { products } = useAppSelector((state) => state.product);

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {products.map((product) => (
        <div className="border rounded-lg shadow-sm" key={product.id}>
          <img
            className="object-contain w-full h-48"
            src={product.image}
            width={212}
            height={212}
            alt={product.title}
          />
          <div className="flex flex-col justify-between gap-2 p-2">
            <div>
              <h5 className="text-sm line-clamp-2 min-h-10">{product.title}</h5>
              <span className="text-lg font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 2,
                }).format(Number(product.price))}
              </span>
            </div>
            <ProductQuantity productId={product.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const ProductListSkeleton = () => (
  <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {new Array(12).fill(0).map((_, index) => (
      <Skeleton key={`product-skeleton-${index}`} className="w-full h-80" />
    ))}
  </div>
);

export default ProductList;
