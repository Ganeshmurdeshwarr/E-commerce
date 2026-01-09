import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import register from "../assets/register.webp";
import { registerUser } from "../Redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../Redux/slices/cartSlice";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId ,loading} = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter and check if it's checkout or something else
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="flex my-10">
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full max-w-md bg-linear-to-b from-pink-200 via-blue-300 to-green-300  backdrop-blur-md
               p-8 rounded-2xl border border-gray-200
               shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
        >
          <div className="flex justify-center mb-8">
            <h2 className="text-lg font-semibold tracking-wide text-gray-800">
              Devadiga's
            </h2>
          </div>

          <p className="text-center text-gray-500 mb-8 text-sm">
            Please enter your details to sign in 👋
          </p>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-700
               focus:outline-none focus:ring-2 focus:ring-black/80
               focus:border-black transition"
              placeholder="Enter your  Name "
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-700
               focus:outline-none focus:ring-2 focus:ring-black/80
               focus:border-black transition"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-700
               focus:outline-none focus:ring-2 focus:ring-black/80
               focus:border-black transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold
             hover:bg-gray-900 active:scale-[0.98]
             transition-all duration-200"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="font-medium text-black hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={register}
            alt="resister to Account "
            className="h-187.5 w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
