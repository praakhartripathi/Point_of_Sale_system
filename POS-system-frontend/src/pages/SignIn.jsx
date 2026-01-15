import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../api/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await signin({ email, password });

      console.log("Sign in successful:", data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
          <h1 className="mt-4 text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to continue
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
          <div className="flex items-center justify-between mb-4 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-muted-foreground/30 text-primary focus:ring-primary" />
              Remember me
            </label>
            <button className="text-primary hover:underline font-medium">
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-70">
            {loading ? "Signing In..." : "Sign In"}
          </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 my-5 text-muted-foreground text-sm">
            <div className="flex-1 h-px bg-border" />
            Or continue with
            <div className="flex-1 h-px bg-border" />
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default SignIn;
