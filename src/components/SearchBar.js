import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      if (onClose) onClose();
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search research papers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 pl-12 pr-12 rounded-xl bg-indigo-950/60 border border-indigo-700/30 text-white placeholder-indigo-300/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300" />
        </div>
        <button type="button" onClick={onClose} className="ml-2 p-2">
          <FaTimes className="text-indigo-300" />
        </button>
      </form>
      
      <div className="mt-2 hidden">
        <div className="text-sm text-indigo-300 mb-1">Popular searches:</div>
        <div className="flex flex-wrap gap-2">
          {["Microgravity", "Radiation", "Human Health", "Plants", "Mars"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-3 py-1 bg-indigo-800/40 rounded-full text-sm hover:bg-indigo-700/60 transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
