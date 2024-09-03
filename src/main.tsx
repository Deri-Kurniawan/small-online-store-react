import ProtectedLayout from "@/layouts/protected-layout.tsx";
import RootLayout from "@/layouts/root-layout.tsx";
import CartPage from "@/routes/Cart.tsx";
import IndexPage from "@/routes/Index.tsx";
import { store } from "@/store";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "@/index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      {
        element: <ProtectedLayout />,
        path: "/cart",
        children: [{ path: "/cart", element: <CartPage /> }],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </StrictMode>
);
