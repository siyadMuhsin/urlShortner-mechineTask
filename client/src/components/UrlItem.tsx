import React, { useState } from "react";
import type { IUrl } from "../interface/IUrl";
import { toast } from "react-toastify";
import { 
  FaCopy, 
  FaTrashAlt, 
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaLink,
  FaTimes,
  FaCheck
} from "react-icons/fa";
import { Dialog } from "@headlessui/react";
interface UrlItemProps{
  url:IUrl,
  onDelete:(id:string)=>void
}
const UrlItem: React.FC<UrlItemProps> = ({ url, onDelete }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = async () => {
    setIsCopying(true);
    try {
      const fullShortUrl = `${backendUrl}/url/${url.shortUrl}`;
      await navigator.clipboard.writeText(fullShortUrl);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    } finally {
      setIsCopying(false);
    }
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    onDelete(url._id);
    setShowDeleteConfirm(false);
  };

  const handleVisit = () => {
    window.open(`${backendUrl}/url/${url.shortUrl}`, "_blank");
  };

  return (
    <>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-bold text-gray-800">
              Delete Short URL
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-gray-600">
              Are you sure you want to delete this short URL?
            </Dialog.Description>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaTimes />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <FaCheck />
                <span>Delete</span>
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* URL Item */}
      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
        <div className="flex flex-col gap-3">
          {/* Original URL */}
          <div className="flex items-start">
            <FaLink className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-700 break-all">
              {url.originalUrl}
            </p>
          </div>
          
          {/* Short URL - More Visible */}
          <div className="bg-blue-50 p-3 rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600 font-medium mb-1">SHORT URL</p>
                <p className="text-blue-800 font-medium break-all">
                  {backendUrl}/url/{url.shortUrl}
                </p>
              </div>
              <button
                onClick={handleCopy}
                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
                title="Copy URL"
                disabled={isCopying}
              >
                <FaCopy className={isCopying ? "animate-spin" : ""} />
              </button>
            </div>
          </div>
          
          {/* Metadata and Actions */}
          <div className="flex items-center justify-between">
            {url.createdAt && (
              <div className="flex items-center text-xs text-gray-500">
                <FaCalendarAlt className="mr-1" />
                <span>{new Date(url.createdAt).toLocaleDateString()}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleVisit}
                className="px-3 py-1.5 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors flex items-center"
                title="Visit URL"
              >
                <FaExternalLinkAlt className="mr-1.5" />
                Visit
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 py-1.5 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors flex items-center"
                title="Delete URL"
              >
                <FaTrashAlt className="mr-1.5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UrlItem;