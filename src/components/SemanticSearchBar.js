import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes, FaClock, FaLightbulb, FaTag, FaFileAlt, FaLayerGroup } from 'react-icons/fa';
import { semanticSearch, getSearchSuggestions } from '../services/api';

const SemanticSearchBar = ({ onClose, onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (searchQuery) => {
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Handle search input change
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length >= 2) {
      try {
        const newSuggestions = await getSearchSuggestions(value);
        setSuggestions(newSuggestions);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle search submission
  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    saveRecentSearch(searchQuery);
    
    try {
      const results = await semanticSearch(searchQuery, { limit: 20 });
      onSearch(results);
      setShowSuggestions(false);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text);
    handleSearch(suggestion.text);
  };

  // Handle recent search click
  const handleRecentClick = (recentQuery) => {
    setQuery(recentQuery);
    handleSearch(recentQuery);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'title': return <FaFileAlt className="text-blue-400" />;
      case 'keyword': return <FaTag className="text-green-400" />;
      case 'category': return <FaLayerGroup className="text-purple-400" />;
      default: return <FaSearch className="text-gray-400" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50">
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Semantic Search</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search papers by title, abstract, keywords, or concepts..."
              className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>

          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div ref={suggestionsRef} className="mt-2 bg-slate-700 rounded-lg border border-slate-600 max-h-64 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-slate-600 transition flex items-center space-x-3"
                >
                  {getSuggestionIcon(suggestion.type)}
                  <div className="flex-1">
                    <div className="text-white font-medium">{suggestion.text}</div>
                    <div className="text-sm text-gray-400">
                      {suggestion.type === 'category' && `${suggestion.count} papers`}
                      {suggestion.type !== 'category' && suggestion.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {!showSuggestions && recentSearches.length > 0 && query.length === 0 && (
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-400 mb-2">
                <FaClock className="mr-2" />
                Recent Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((recent, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentClick(recent)}
                    className="px-3 py-1 bg-slate-600 text-gray-300 rounded-full text-sm hover:bg-slate-500 transition"
                  >
                    {recent}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Tips */}
          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg">
            <div className="flex items-start space-x-2">
              <FaLightbulb className="text-blue-400 mt-0.5" size={14} />
              <div className="text-sm text-blue-200">
                <p className="font-medium mb-1">Search Tips:</p>
                <ul className="text-xs space-y-1">
                  <li>• Use specific terms like "bone loss" or "microgravity"</li>
                  <li>• Search by research area: "plant biology", "radiation"</li>
                  <li>• Try author names or paper titles</li>
                  <li>• Use keywords from abstracts for better results</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemanticSearchBar;
