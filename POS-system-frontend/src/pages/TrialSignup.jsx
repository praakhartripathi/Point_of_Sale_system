import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../api/endpoints";

const TrialSignup = () => {
  const [ownerName, setOwnerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/trial/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName,
          ownerName,
          email,
          mobile,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create trial account");
      }

      const data = await response.json();
      console.log("Trial created:", data);

      alert("Trial Account Created Successfully! Please Sign In to continue.");
      navigate("/trial-signin");
    } catch (error) {
      console.error("Error:", error);
      alert(`Error creating trial account: ${error.message}. Please ensure the backend is running on port 5001.`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 text-foreground py-10">
      <div className="w-full max-w-md">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              🛒
            </div>
            <span>POS Pro</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold">Start your 7-day free trial</h1>
          <p className="text-sm text-muted-foreground">No credit card required</p>
        </div>

        {/* Card */}
        <div className="bg-card text-card-foreground rounded-xl shadow-lg p-6 border">
          <form onSubmit={handleSubmit}>
            {/* Business Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Business Name</label>
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg border focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <span className="text-muted-foreground">🏢</span>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="My Store Pvt Ltd"
                  className="bg-transparent w-full outline-none text-sm placeholder:text-muted-foreground/50"
                  required
                />
              </div>
            </div>

            {/* Owner Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Owner Name</label>
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg border focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <span className="text-muted-foreground">👤</span>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="John Doe"
                  className="bg-transparent w-full outline-none text-sm placeholder:text-muted-foreground/50"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email Address</label>
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

            {/* Mobile Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Mobile No</label>
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg border focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <span className="text-muted-foreground">📱</span>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="bg-transparent w-full outline-none text-sm placeholder:text-muted-foreground/50"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
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

            {/* Terms Agreement */}
            <div className="mb-4 text-xs text-muted-foreground">
              By signing up, you agree to our <a href="#" className="underline hover:text-primary">Terms</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-70">
              {loading ? "Creating Account..." : "Start Free Trial"}
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
            onClick={handleGoogleLogin}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Start Free Trial with Google
          </button>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/trial-signin" className="text-primary hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialSignup;