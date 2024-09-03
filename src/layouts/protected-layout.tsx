/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth, useClerk } from "@clerk/clerk-react";
import * as React from "react";
import { Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  const { userId, isLoaded } = useAuth();
  const { buildSignInUrl } = useClerk();

  React.useEffect(() => {
    if (isLoaded && !userId) {
      window.location.href = buildSignInUrl();
    }
  }, [isLoaded]);

  if (isLoaded && !userId) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-screen h-screen bg-neutral-50/80 z-[999]">
        <span className="text-4xl select-none lg:text-8xl font-protest-guirella animate-pulse">
          Redirecting...
        </span>
      </div>
    );
  }

  return <Outlet />;
}
