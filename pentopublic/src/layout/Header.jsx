// src/components/Header.jsx
import { LogOut, Search, User, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5041/api";

const Header = ({ search, setSearch, setFilter }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Only run subscription check if user is loaded
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user?.userId || user.role !== "reader") return;

      try {
        const res = await axios.get(
          `${API_BASE}/Reader/${user.userId}/subscription`
        );
        setIsSubscribed(res.data.isSubscribed);
      } catch (err) {
        console.error("Error fetching subscription", err);
      }
    };

    fetchSubscription();
  }, [user]);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setDropdownOpen(false);
  };

  const handleSubscriptionClick = () => {
    if (!isSubscribed) {
      navigate("/subscription", {
        state: { userId: user?.userId },
      });
      setDropdownOpen(false);
    }
  };

  const filterOptions = [
    { label: "All Books", value: "all" },
    { label: "Top Books", value: "top" },
    { label: "Recent Books", value: "recent" },
    { label: "Free Books", value: "free" },
    { label: "Audio Books", value: "audio" },
  ];

  return (
    <header className="bg-white shadow px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-20 border-b">
      <div className="flex items-center gap-4">
        <h1
          className="text-2xl font-bold cursor-pointer text-blue-600"
          onClick={() => {
            setFilter("all");
            navigate("/");
          }}
        >
          PenToPublic
        </h1>

        <div className="hidden md:flex gap-2 text-sm">
          {filterOptions.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={clsx(
                "px-3 py-1.5 rounded-full text-gray-700 border hover:bg-blue-50 transition",
                "border-gray-300"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full md:max-w-md">
        <div className="flex items-center border rounded-full px-3 py-2 shadow">
          <Search size={16} className="mr-2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search books or authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none outline-none w-full"
          />
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-2 border rounded-full px-3 py-2 bg-white hover:bg-gray-100 transition"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <User size={18} />
          <span>{user?.userName}</span>
          <ChevronDown size={16} />
        </button>

        {dropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setDropdownOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow z-50 overflow-hidden">
              <div className="p-4 border-b">
                <p className="font-semibold">{user?.userName}</p>
                <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
              </div>

              <button
                onClick={handleProfileClick}
                className="w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                Your Profile
              </button>

              {user?.role === "reader" && (
                <div
                  onClick={handleSubscriptionClick}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-y"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {isSubscribed ? "✅" : "❌"}
                    </span>
                    <div>
                      <p className="font-medium">
                        {isSubscribed ? "Premium Member" : "Free Member"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {isSubscribed
                          ? "Enjoy unlimited access"
                          : "Click to upgrade"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
              >
                <LogOut size={16} className="inline mr-2" />
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
