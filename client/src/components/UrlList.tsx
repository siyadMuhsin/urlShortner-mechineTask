import React, { useEffect, useState } from "react";
import { getUserUrls } from "../services/url.service";
import UrlItem from "./UrlItem";
import type { IUrl } from "../interface/IUrl";

const UrlList: React.FC = () => {
  const [urls, setUrls] = useState<IUrl[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUrls = async () => {
    setLoading(true);
    const response = await getUserUrls();
    if (response.ok && response.urls) {
      setUrls(response.urls);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-3">Your Shortened URLs</h2>
      {loading ? (
        <p>Loading URLs...</p>
      ) : (
        <div className="space-y-2">
          {urls.length > 0 ? (
            urls.map((url) => <UrlItem key={url._id} url={url} />)
          ) : (
            <p>No URLs found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UrlList;
