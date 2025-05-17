import React from "react";
import type { IUrl } from "../interface/IUrl";
// import { IUrl } from "../services/url.service";


interface UrlItemProps {
  url: IUrl;
}

const UrlItem: React.FC<UrlItemProps> = ({ url }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-2 shadow-sm flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">Short URL: {url.shortUrl}</p>
        <p className="text-base">{url.originalUrl}</p>
      </div>
      {/* <a
        href={url.originalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 text-white px-3 py-1 rounded"
      > */}
        {/* Visit
      </a> */}
    </div>
  );
};

export default UrlItem;
