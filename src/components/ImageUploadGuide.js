import React, { useState } from 'react';
import { FaInfoCircle, FaUpload, FaFileImage, FaExternalLinkAlt } from 'react-icons/fa';

const ImageUploadGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-blue-300 hover:text-blue-200 transition"
      >
        <FaInfoCircle className="mr-2" />
        <span className="font-medium">How to Add Real Research Images</span>
        <span className="ml-2 text-sm">{isOpen ? '▼' : '▶'}</span>
      </button>
      
      {isOpen && (
        <div className="mt-4 space-y-3 text-sm text-gray-300">
          <div>
            <h4 className="font-semibold text-white mb-2 flex items-center">
              <FaFileImage className="mr-2" />
              Method 1: Extract from PDF
            </h4>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Open the research paper PDF</li>
              <li>Use Adobe Acrobat or Preview to select and copy figures</li>
              <li>Save as high-resolution images (PNG/JPG)</li>
              <li>Upload to your project's public/images folder</li>
            </ol>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2 flex items-center">
              <FaUpload className="mr-2" />
              Method 2: Direct URL Replacement
            </h4>
            <p className="mb-2">Replace the placeholder URLs in <code className="bg-slate-700 px-1 rounded">src/services/api.js</code>:</p>
            <div className="bg-slate-800 p-3 rounded text-xs font-mono">
              <div className="text-green-400">// Replace this:</div>
              <div className="text-red-400">url: "data:image/svg+xml;base64,..."</div>
              <div className="text-green-400">// With this:</div>
              <div className="text-blue-400">url: "/images/paper1-figure1.jpg"</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2 flex items-center">
              <FaExternalLinkAlt className="mr-2" />
              Method 3: Use Research Paper URLs
            </h4>
            <p>Some papers have direct figure URLs. Check the paper's supplementary materials or contact authors for high-resolution images.</p>
          </div>
          
          <div className="bg-yellow-900/20 border border-yellow-800/30 p-3 rounded">
            <p className="text-yellow-200 text-xs">
              <strong>Note:</strong> Ensure you have proper permissions to use research images. 
              For public use, consider using open-access papers or contacting authors for permission.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadGuide;
