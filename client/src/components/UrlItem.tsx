import React from "react";
import type { IUrl } from "../interface/IUrl";
import { toast } from "react-toastify";
import { 
  FaCopy, 
  FaTrashAlt, 
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaLink
} from "react-icons/fa";

interface UrlItemProps {
  url: IUrl;
  onDelete: (id: string) => void;
}

const UrlItem: React.FC<UrlItemProps> = ({ url, onDelete }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

  const handleCopy = () => {
    const fullShortUrl = `${backendUrl}/url/${url.shortUrl}`;
    navigator.clipboard.writeText(fullShortUrl)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy"));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this URL?")) {
      onDelete(url._id);
    }
  };

  const handleVisit = () => {
    window.open(`${backendUrl}/url/${url.shortUrl}`, "_blank");
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex items-start justify-between gap-2">
        {/* URL Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-1">
            <FaLink className="text-blue-500 mr-2 text-xs flex-shrink-0" />
            <p className="text-sm text-gray-700 truncate">
              {url.originalUrl}
            </p>
          </div>
          
          <div className="flex items-center text-xs text-gray-500 mb-1">
            <span className="truncate">
              {backendUrl}/url/{url.shortUrl}
            </span>
          </div>
          
          {url.createdAt && (
            <div className="flex items-center text-xs text-gray-400">
              <FaCalendarAlt className="mr-1" />
              <span>{new Date(url.createdAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleVisit}
            className="p-2 text-green-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
            title="Visit URL"
          >
            <FaExternalLinkAlt className="text-sm" />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Copy URL"
          >
            <FaCopy className="text-sm" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete URL"
          >
            <FaTrashAlt className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrlItem;