import React, { useEffect, useState } from "react";
import { deleteUrl, getUserUrls } from "../services/url.service";
import UrlItem from "./UrlItem";
import type { IUrl } from "../interface/IUrl";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import { PulseLoader } from "react-spinners";

const UrlList: React.FC = () => {
  const [urls, setUrls] = useState<IUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserUrls();
      if (response.ok && response.urls) {
        setUrls(response.urls);
      } else {
        setError(response.msg || "Failed to fetch URLs");
      }
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteUrl(id);
      if (response.ok) {
        toast.success(response.msg);
        setUrls(prev => prev.filter(url => url._id !== id));
      } else {
        toast.error(response.msg || "Failed to delete URL");
      }
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message || "An error occurred while deleting");
    }
  };

  const handleRefresh = () => {
    fetchUrls();
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Your Shortened URLs</h2>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
        >
          <FiRefreshCw className={`mr-1 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <PulseLoader color="#3B82F6" size={10} />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 flex items-start">
          <FiAlertCircle className="text-lg mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Error loading URLs</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={fetchUrls}
              className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      ) : urls.length > 0 ? (
        <div className="space-y-3">
          {urls.map((url) => (
            <UrlItem key={url._id} url={url} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-500">No shortened URLs found</p>
          <p className="text-sm text-gray-400 mt-1">
            Start by shortening a URL above
          </p>
        </div>
      )}
    </div>
  );
};

export default UrlList;