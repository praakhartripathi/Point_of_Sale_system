import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse query parameters from the backend redirect URL
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const role = params.get("role");
    const name = params.get("name");
    const error = params.get("error");

    if (token) {
      // Store authentication data
      localStorage.setItem("token", token);
      if (role) localStorage.setItem("role", role);
      if (name) localStorage.setItem("name", name);

      // Redirect based on user role (matching logic in SignIn.jsx)
      switch (role) {
        case "ROLE_SUPERADMIN":
          navigate("/super-admin/dashboard");
          break;
        case "ROLE_ADMIN":
          navigate("/admin/dashboard");
          break;
        case "ROLE_STORE_MANAGER":
          navigate("/store-manager/dashboard");
          break;
        case "ROLE_BRANCH_MANAGER":
          navigate("/branch-manager/dashboard");
          break;
        case "ROLE_CASHIER":
          navigate("/cashier/dashboard");
          break;
        case "ROLE_USER":
        default:
          navigate("/dashboard");
      }
    } else {
      // If no token is found, redirect back to sign-in with an error
      navigate("/signin", {
        state: {
          error: error || "Google authentication failed. Please try again.",
        },
      });
    }
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center text-foreground">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground text-sm">Completing sign in...</p>
      </div>
    </div>
  );
};

export default OAuth2RedirectHandler;