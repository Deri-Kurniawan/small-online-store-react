import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  decrementQuantity,
  deleteCart,
  incrementQuantity,
  setCarts,
} from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useUser } from "@clerk/clerk-react";
import {
  IconCreditCard,
  IconCurrencyDollar,
  IconMinus,
  IconPlus,
  IconTrash,
  IconWallet,
} from "justd-icons";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CartPage = () => {
  const { user, isLoaded } = useUser();
  const { carts } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const totalQuantityCount = carts.reduce((totalCount, cart) => {
    return totalCount + cart.quantity;
  }, 0);

  const totalQuantityPrice = carts.reduce((totalPrice, cart) => {
    return totalPrice + cart.price * cart.quantity;
  }, 0);

  const freeShippingThreshold = 100;
  const shippingCost =
    totalQuantityPrice > freeShippingThreshold || totalQuantityCount === 0
      ? 0
      : 10;

  const taxRate = 0.005; // 0.5% tax rate
  const itemShippingFee = 2; // biaya pengiriman per item dalam USD
  const totalShippingFee = itemShippingFee * totalQuantityCount;

  const totalOrderPrice = totalQuantityPrice + totalShippingFee;

  return (
    <div className="grid grid-cols-1 gap-8 px-4 py-12 mx-auto lg:grid-cols-12 max-w-screen-2xl">
      <div className="col-span-1 p-6 space-y-6 lg:col-span-8 bg-muted/40 rounded-xl">
        <div className="grid gap-2">
          <h2 className="text-3xl font-bold">Your Cart</h2>
          <p className="text-muted-foreground">
            Review and manage the items in your cart.
          </p>
        </div>
        <div className="grid gap-4">
          {carts.length > 0 ? (
            carts.map((cart) => (
              <div key={cart.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={cart.imageUrl}
                    alt="Product Image"
                    width={64}
                    height={64}
                    className="object-contain rounded-md aspect-square"
                  />
                  <div>
                    <h3 className="px-4 font-medium line-clamp-2">
                      {cart.title}
                    </h3>
                    <p className="px-4 text-sm text-muted-foreground line-clamp-2">
                      {cart.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      dispatch(deleteCart(cart.id));
                    }}
                  >
                    <IconTrash className="w-4 h-4 text-red-500" />
                    <span className="sr-only">Remove</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (cart.quantity - 1 === 0) return;
                      dispatch(decrementQuantity(cart.id));
                    }}
                  >
                    <IconMinus className="w-4 h-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div>{cart.quantity}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      dispatch(incrementQuantity(cart.id));
                    }}
                  >
                    <IconPlus className="w-4 h-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center gap-1 text-center bg-white rounded-lg text-muted-foreground min-h-20">
              No items in your cart.
              <Link to="/" className="text-blue-500">
                Continue shopping?
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-1 space-y-6 lg:col-span-4">
        <div className="p-6 space-y-4 bg-muted/40 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="pr-6">
              <h3 className="font-medium">Total Items</h3>
              <p className="text-sm text-muted-foreground">
                {carts.length} {carts.length == 1 ? "item" : "items"}
              </p>
            </div>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
              }).format(totalQuantityPrice)}
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="pr-6">
              <h3 className="font-medium">Shipping</h3>
              <p className="text-sm text-muted-foreground">
                {shippingCost === 0 ? (
                  "Free"
                ) : (
                  <span>
                    Standard Shipping, Free over{" "}
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 2,
                    }).format(freeShippingThreshold)}
                  </span>
                )}
              </p>
            </div>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
              }).format(shippingCost)}
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="pr-6">
              <h3 className="font-medium">Total</h3>
              <p className="text-sm text-muted-foreground">
                Includes taxes ({taxRate * 100}%) and fees
              </p>
            </div>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
              }).format(totalOrderPrice)}
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4 bg-muted/40 rounded-xl">
          <div className="grid gap-2">
            <h3 className="font-medium">Payment Method</h3>
            <p className="text-sm text-muted-foreground">
              Select your preferred payment method.
            </p>
          </div>
          <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
            <div>
              <RadioGroupItem value="card" id="card" className="sr-only peer" />
              <Label
                htmlFor="card"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <IconCreditCard className="w-6 h-6 mb-3" />
                Card
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="paypal"
                id="paypal"
                className="sr-only peer"
              />
              <Label
                htmlFor="paypal"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <IconWallet className="w-6 h-6 mb-3" />
                Wallet
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="apple"
                id="apple"
                className="sr-only peer"
                disabled
              />
              <Label
                htmlFor="apple"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <IconCurrencyDollar className="w-6 h-6 mb-3" />
                Cash
              </Label>
            </div>
          </RadioGroup>
          <Button
            className="w-full"
            onClick={() => {
              if (!isLoaded || !user) return;
              toast.success("Order has been placed successfully");
              dispatch(setCarts([]));
            }}
            disabled={carts.length === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
