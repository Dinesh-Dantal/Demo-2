// src/layout/Header.jsx

import { LogOut, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = ({ search, setSearch, setFilter }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(null); // null = loading

  useEffect(() => {
    const fetchSubscription = async () => {
      if (user?.role === "reader" && user?.userId) {
        try {
          const res = await axios.get(
            `http://localhost:5041/api/Reader/${user.userId}/subscription`
          );
          setIsSubscribed(res.data.isSubscribed);
        } catch (err) {
          console.error("Subscription fetch error:", err);
          setIsSubscribed(false); // fallback
        }
      } else {
        setIsSubscribed(null); // not a reader
      }
    };

    fetchSubscription();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filterOptions = [
    { label: "All Books", value: "all" },
    { label: "Top Books", value: "top" },
    { label: "Recent Books", value: "recent" },
    { label: "Free Books", value: "free" },
    { label: "Audio Books", value: "audio" },
  ];

  return (
    <header className="bg-white shadow-sm px-4 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-20 border-b">
      {/* Left: Logo + Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <h1
          className="text-2xl font-extrabold text-blue-600 tracking-tight cursor-pointer"
          onClick={() => {
            setFilter("all");
            navigate("/");
          }}
        >
          PenToPublic
        </h1>

        <div className="flex flex-wrap gap-3 text-sm">
          {filterOptions.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={clsx(
                "px-3 py-1 rounded-md font-medium transition-all",
                "text-gray-600 hover:text-blue-600 hover:bg-blue-50",
                "active:scale-95"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Middle: Search */}
      <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full md:max-w-md">
        <Search className="text-gray-400 mr-2" size={18} />
        <Input
          type="text"
          placeholder="Search books or authors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none focus:ring-0 w-full"
        />
      </div>

      {/* Right: User Info + Logout */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-start text-gray-700">
          <div className="flex items-center gap-2">
            <User size={18} />
            <span className="text-sm font-semibold truncate max-w-[120px]">
              {user?.userName || "Guest"}
            </span>
          </div>
          {user?.role === "reader" && (
            <span className="text-xs text-gray-500 ml-6">
              {isSubscribed === null
                ? "⏳ Checking..."
                : isSubscribed
                ? "✅ Subscribed"
                : "❌ Not Subscribed"}
            </span>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600 transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
