import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signin } from "../api/auth";
import { API_BASE_URL } from "../api/endpoints";

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.error) {
      setError(location.state.error);
      // Clear state to prevent error persisting on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        // Mock Signup Logic
        console.log("Signing up with:", { name, email, password });
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        
        // Auto-login after signup simulation
        localStorage.setItem("token", "mock-signup-token");
        localStorage.setItem("role", "ROLE_USER");
        localStorage.setItem("name", name);
        navigate("/dashboard");
        return;
      }

      const data = await signin({ email, password });

      console.log("Sign in successful:", data);
      const token = data.token || data.jwt;
      if (token) {
        localStorage.setItem("token", token.trim());
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name || "User");

        switch (data.role) {
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
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 text-foreground">
      <div className="w-full max-w-md">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              🛒
            </div>
            <span>POS Pro</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold">{isSignUp ? "Create an Account" : "Welcome Back"}</h1>
          <p className="text-sm text-muted-foreground">
            {isSignUp ? "Enter your details to get started" : "Sign in to your account to continue"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-card text-card-foreground rounded-xl shadow-lg p-6 border">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

          {/* Name Field (Sign Up Only) */}
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg border focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <span className="text-muted-foreground">👤</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="bg-transparent w-full outline-none text-sm placeholder:text-muted-foreground/50"
                  required={isSignUp}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg border focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <span className="text-muted-foreground">📧</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="bg-transparent w-full outline-none text-sm placeholder:text-muted-foreground/50"
                required
              />
            </div>
          </div>


          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg border focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <span className="text-muted-foreground">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent w-full outline-none text-sm placeholder:text-muted-foreground/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          {!isSignUp && <div className="flex items-center justify-between mb-4 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-muted-foreground/30 text-primary focus:ring-primary" />
              Remember me
            </label>
            <button className="text-primary hover:underline font-medium">
              Forgot password?
            </button>
          </div>}

          {/* Sign In Button */}
          <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-70">
            {loading ? (isSignUp ? "Creating Account..." : "Signing In...") : (isSignUp ? "Sign Up" : "Sign In")}
          </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 my-5 text-muted-foreground text-sm">
            <div className="flex-1 h-px bg-border" />
            Or continue with
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Google Sign In */}
          <button 
            type="button"
            className="w-full bg-white border border-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2 mb-4"
            onClick={() => handleGoogleLogin()}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign {isSignUp ? "up" : "in"} with Google
          </button>

          {/* Demo Account */}
          <div 
            className="bg-muted rounded-lg p-4 text-center text-sm cursor-pointer hover:bg-muted/80 transition-colors"
            onClick={() => {
              setEmail("john.doe@example.com");
              setPassword("password123");
            }}
          >
            <p className="font-medium">Demo Account (Click to fill):</p>
            <p className="text-muted-foreground">Email: john.doe@example.com</p>
            <p className="text-muted-foreground">Password: password123</p>
          </div>

          {/* Toggle Sign In / Sign Up */}
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary hover:underline font-medium">
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
