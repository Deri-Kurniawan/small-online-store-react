import { addToCart } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useClerk, useUser } from "@clerk/clerk-react";
import { IconAddToCart, IconMinus, IconPlus } from "justd-icons";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

type ProductQuantityProps = {
  productId: number;
};

const ProductQuantity = ({ productId }: ProductQuantityProps) => {
  const { user, isSignedIn } = useUser();
  const { products } = useAppSelector((state) => state.product);
  const { carts } = useAppSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { buildSignInUrl } = useClerk();

  const product = products.find((product) => product.id === productId);

  return (
    <form
      className="flex items-center justify-between gap-2"
      onSubmit={(e) => {
        if (quantity < 1) {
          toast.error("Minimum quantity is 1");
          return;
        }
        e.preventDefault();
        if (!isSignedIn) {
          window.location.href = buildSignInUrl();
          return;
        }
        if (!product) {
          toast.error("Product not found");
          return;
        }

        dispatch(
          addToCart({
            id: carts.length + 1,
            productId: product.id,
            userId: user?.id as string,
            title: product.title,
            description: product.description,
            price: Number(product.price),
            quantity,
            imageUrl: product.image,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        );
      }}
    >
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => {
            if (quantity - 1 === 0) return;
            setQuantity(quantity - 1);
          }}
        >
          <IconMinus className="w-4 h-4" />
          <span className="sr-only">Remove</span>
        </Button>
        <div>{quantity}</div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => {
            setQuantity(quantity + 1);
          }}
        >
          <IconPlus className="w-4 h-4" />
          <span className="sr-only">Add</span>
        </Button>
      </div>
      <Button
        type="submit"
        size="icon"
        variant="secondary"
        disabled={quantity < 1}
      >
        <IconAddToCart className="w-6 h-6 text-green-500" />
      </Button>
    </form>
  );
};

export default ProductQuantity;
