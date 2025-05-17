import React, { useState } from "react";
import { useAuth } from "../context/auth.context";
import { loguotUser } from "../services/auth.service";
import { toast } from "react-toastify";
import UrlList from "../components/UrlList";
import { shortUrl } from "../services/url.service";

const Home: React.FC = () => {
  const { logout, user } = useAuth();
  const [originalUrl, setOriginalUrl] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await loguotUser();
      if (response.ok) {
        logout();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Replace this with your actual API call to shorten the URL
      const response = await shortUrl(originalUrl);
      if (response.success) {
        toast.success("URL shortened successfully!");
        setOriginalUrl("");
        // You might want to refresh the UrlList here
      }
      toast.success("URL shortening functionality would go here");
      setOriginalUrl("");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.username || "User"}!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Shorten a URL</h2>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter your long URL"
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Shortening..." : "Shorten"}
          </button>
        </form>
      </div>

      <UrlList />
    </div>
  );
};

export default Home;