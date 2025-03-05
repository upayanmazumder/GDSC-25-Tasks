"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/login", { username, password });
      if (res.data.token) {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow-lg rounded">
        <h2 className="text-xl mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-blue-500 text-white px-4 py-2">Login</button>
      </form>
    </div>
  );
}
