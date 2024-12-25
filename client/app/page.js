"use client";


import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "./Context/AppContext";

export default function Login() {
  const { setToken } = useContext(AppContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      router.push("/todo");
    }
  }

  return (
    
    <div className="max-w-lg mx-auto mt-10 p-6 shadow-lg border rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        

        {/* Email Field */}
        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-gray-700 font-medium">Email</label>
          <div className="w-3/4">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
          </div>
        </div>

        {/* Password Field */}
        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-gray-700 font-medium">Password</label>
          <div className="w-3/4">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
          </div>
        </div>

        

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Login
          </button>
          
        </div>
        <p className="mt-1">Don't have an account? <a href="/register" className="text-blue-500">Register</a></p>
      </form>
    </div>
  );
}