import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginCustomer } from "../../api/customerAPI";
import { loginAdmin } from "../../api/adminAPI";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userType, setUserType] = useState("customer"); // 'customer' or 'admin'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      if (userType === "admin") {
        if (email === "admin@gmail.com" && password === "Admin123@") {
          const adminUser = {
            name: "Admin",
            email,
            role: "admin",
          };
          localStorage.setItem("user", JSON.stringify(adminUser));
          setMessage(" Admin login successful");

          setTimeout(() => {
            navigate("/admin/panel", { replace: true });
          }, 500);
        } else {
          setMessage(" Invalid admin credentials");
        }
      } else {
        try {
          const res = await loginCustomer({ email, password });
          console.log("Customer login response:", res);

          const user = res?.user || {
            name: res?.name,
            email: res?.email,
            role: res?.role || "customer",
            _id: res?.userId || res?.id,
          };

          if (user?.email) {
            localStorage.setItem("user", JSON.stringify(user));
            setMessage(" Customer login successful");

            setTimeout(() => {
              navigate("/customer/home", { replace: true });
              navigate("/prescription", { replace: true });
            }, 500);
          } else {
            setMessage(
              res.message || "Login succeeded but user details missing."
            );
          }
        } catch (apiError) {
          console.error("Customer login error:", apiError);
          setMessage(apiError.response?.data?.message || " Login failed.");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage(" An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-200 rounded-full opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-200 rounded-full opacity-20"></div>

          <div className="relative p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                MediTrack
              </h2>
              <p className="text-gray-500 mt-2">Sign in to your account</p>
            </div>

            {/* User Type Selection */}
            <div className="mb-6">
              <div className="flex rounded-lg overflow-hidden border border-gray-200">
                <button
                  type="button"
                  className={`flex-1 py-3 px-4 text-center transition-all ${
                    userType === "customer"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setUserType("customer")}
                >
                  Customer
                </button>
                <button
                  type="button"
                  className={`flex-1 py-3 px-4 text-center transition-all ${
                    userType === "admin"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setUserType("admin")}
                >
                  Administrator
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      userType === "admin"
                        ? "admin@gmail.com"
                        : "your@email.com"
                    }
                    required
                    className="w-full pl-10 pr-4 py-3 border-0 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                  <span className="absolute left-3 top-3.5 text-gray-400">
                    ✉️
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-3 border-0 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                  <span className="absolute left-3 top-3.5 text-gray-400">
                    🔒
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex justify-center items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  `Sign In as ${
                    userType === "admin" ? "Administrator" : "Customer"
                  }`
                )}
              </button>
            </form>

            {message && (
              <div
                className={`mt-6 p-4 rounded-lg text-center animate-fadeIn ${
                  message.includes()
                    ? "bg-green-50 text-green-800 border-l-4 border-green-500"
                    : "bg-red-50 text-red-800 border-l-4 border-red-500"
                }`}
              >
                {message}
              </div>
            )}

            {/* Admin credentials hint */}
            {userType === "admin" && (
              <div className="mt-4 bg-blue-50 p-3 rounded-lg text-blue-700 text-xs">
                <p className="font-medium">Admin Login</p>
                <p className="mt-1">
                  Email: admin@gmail.com
                  <br />
                  Password: Admin123@
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-6 text-gray-500 text-sm">
          {userType === "customer" && (
            <>
              Don't have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Register now
              </a>
            </>
          )}
          {userType === "admin" && (
            <>
              Need administrator access?{" "}
              <a href="/contact" className="text-blue-600 hover:underline">
                Contact support
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
