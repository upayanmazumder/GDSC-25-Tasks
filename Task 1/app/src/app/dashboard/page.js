"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export default function DashboardPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const decoded = JSON.parse(atob(token.split(".")[1]));
    setUsername(decoded.username);
  }, []);

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    router.push("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl">Welcome, {username}!</h1>
      <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2">
        Logout
      </button>
    </div>
  );
}
