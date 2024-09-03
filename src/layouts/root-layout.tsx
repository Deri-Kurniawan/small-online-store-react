import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <div className="mx-auto max-w-screen-2xl">
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      <Toaster richColors closeButton />
    </ClerkProvider>
  );
}
