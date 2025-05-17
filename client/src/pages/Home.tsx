import React, { useState } from "react";
import { useAuth } from "../context/auth.context";
import { loguotUser } from "../services/auth.service";
import { toast } from "react-toastify";
import UrlList from "../components/UrlList";
import { shortUrl } from "../services/url.service";
import { FiLogOut, FiLink, FiUser, FiArrowRight, FiX, FiCheck } from "react-icons/fi";
import { Dialog } from "@headlessui/react";

const Home: React.FC = () => {
  const { logout, user } = useAuth();
  const [originalUrl, setOriginalUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Add refresh key state

  const handleLogout = async () => {
    try {
      const response = await loguotUser();
      if (response.ok) {
        logout();
        toast.success("Logged out successfully");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setShowLogoutConfirm(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl) return;
    
    setIsLoading(true);
    
    try {
      const response = await shortUrl(originalUrl);
      if (response.ok) {
        toast.success("URL shortened successfully!");
        setOriginalUrl("");
        setRefreshKey(prev => prev + 1); // Increment refresh key to trigger re-render
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to shorten URL");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Logout Confirmation Dialog */}
      <Dialog
        open={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-xl font-bold text-gray-800">
              Confirm Logout
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-gray-600">
              Are you sure you want to log out of your account?
            </Dialog.Description>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FiX />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <FiCheck />
                <span>Logout</span>
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiLink className="text-blue-600 text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">URL Shortener</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full shadow-sm">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <FiUser className="text-blue-600 text-sm" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user?.username || "User"}
              </span>
            </div>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition-all border border-gray-200"
            >
              <FiLogOut className="text-gray-500" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Shorten URL Card with Gradient Background */}
          <section className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <FiLink className="mr-3" />
                Shorten Your Links
              </h2>
              <p className="text-blue-100 mt-2">
                Create short, memorable URLs in seconds
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="https://example.com/very-long-url"
                className="flex-1 p-4 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 bg-white bg-opacity-90 placeholder-gray-400"
                required
              />
              <button
                type="submit"
                disabled={isLoading || !originalUrl}
                className={`flex items-center justify-center px-6 py-4 rounded-lg font-medium transition-all ${
                  isLoading || !originalUrl
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-white hover:bg-opacity-90 text-blue-600 shadow-md"
                }`}
              >
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    <span>Shorten</span>
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </section>

          {/* URL List Section */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Your Shortened URLs</h2>
              <p className="text-gray-500">
                All your links in one place
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <UrlList key={refreshKey} /> {/* Pass refreshKey as key to force re-render */}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;