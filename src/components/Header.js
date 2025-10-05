import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes, FaRocket } from 'react-icons/fa';
import SearchBar from './SearchBar';
import SemanticSearchBar from './SemanticSearchBar';
import SearchResults from './SearchResults';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSemanticSearchOpen, setIsSemanticSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  return (
    <header className="bg-slate-900 border-b border-indigo-800/30 sticky top-0 z-50 shadow-lg shadow-indigo-500/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <FaRocket className="text-nasa-red text-2xl animate-pulse" />
            <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              NASA Bioscience Explorer
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition">About</Link>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full hover:bg-indigo-900/50 transition"
                title="Basic Search"
              >
                <FaSearch className="text-lg text-gray-300" />
              </button>
              <button 
                onClick={() => setIsSemanticSearchOpen(true)}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                title="Semantic Search"
              >
                AI Search
              </button>
            </div>
          </div>

          <button 
            className="md:hidden text-gray-300 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-3">
              <li><Link to="/" className="block py-2 text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="block py-2 text-gray-300 hover:text-white">About</Link></li>
              <li>
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="flex items-center py-2 text-gray-300 hover:text-white"
                >
                  <FaSearch className="mr-2" /> Search
                </button>
              </li>
            </ul>
          </nav>
        )}

        {/* Search overlay */}
        {isSearchOpen && (
          <div className="mt-4">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}
      </div>

      {/* Semantic Search Modal */}
      {isSemanticSearchOpen && (
        <SemanticSearchBar 
          onClose={() => setIsSemanticSearchOpen(false)}
          onSearch={(results) => {
            setSearchResults(results);
            setIsSemanticSearchOpen(false);
          }}
        />
      )}

      {/* Search Results Modal */}
      {searchResults && (
        <SearchResults 
          searchResults={searchResults}
          onClose={() => setSearchResults(null)}
        />
      )}
    </header>
  );
};

export default Header;
