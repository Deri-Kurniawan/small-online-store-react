import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { IconCart } from "justd-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { carts } = useAppSelector((state) => state.cart);

  return (
    <nav className="px-8 py-2 bg-white border">
      <div className="flex flex-row items-center justify-between">
        <Link to="/">
          <h1 className="text-3xl font-protest-guirella">KlikProduk</h1>
        </Link>
        <div className="flex flex-row gap-2">
          <Button size="icon" variant="ghost" className="relative" asChild>
            <Link to="/cart">
              {carts.length > 0 && (
                <span className="absolute z-10 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-green-500 rounded-full -top-1 -right-1">
                  {carts.length}
                </span>
              )}
              <IconCart className="w-5 h-5" />
            </Link>
          </Button>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton />
          </SignedOut>

          {/* <Button variant="ghost" className="flex gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={user?.imageUrl} alt="user avatar" />
              <AvatarFallback className="text-sm">
                {(user?.firstName ?? "").charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-base">{user?.firstName}</span>
          </Button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
