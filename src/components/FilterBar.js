import React from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaSort, FaChartBar } from 'react-icons/fa';

const FilterBar = ({ activeFilter, setActiveFilter, sortOption, setSortOption, viewMode, setViewMode }) => {
  // Filter options
  const filters = [
    { id: 'all', name: 'All Papers' },
    { id: 'cellular', name: 'Cellular Biology' },
    { id: 'human', name: 'Human Health' },
    { id: 'plants', name: 'Plant Biology' },
    { id: 'radiation', name: 'Radiation' },
    { id: 'microbiology', name: 'Microbiology' }
  ];
  
  // Sort options
  const sortOptions = [
    { id: 'recent', name: 'Most Recent' },
    { id: 'oldest', name: 'Oldest First' },
    { id: 'alphabetical', name: 'A-Z' }
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/60 border border-indigo-800/20 rounded-xl p-3 mb-6"
    >
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0">
        {/* Category filters */}
        <div className="flex-grow">
          <div className="flex items-center mb-2 text-indigo-300 text-sm">
            <FaFilter className="mr-2" />
            <span>Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  activeFilter === filter.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700/60 text-gray-300 hover:bg-slate-700'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Sort options */}
        <div className="md:w-64">
          <div className="flex items-center mb-2 text-indigo-300 text-sm">
            <FaSort className="mr-2" />
            <span>Sort by:</span>
          </div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full bg-slate-700/60 border border-slate-600/30 text-gray-300 py-1.5 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* View mode */}
        <div className="md:ml-4 flex">
          <div className="flex items-center mb-0 text-indigo-300 text-sm mr-2">
            <FaChartBar className="mr-2" />
            <span>View:</span>
          </div>
          <div className="flex rounded-lg overflow-hidden border border-slate-600/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-sm ${
                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-slate-700/60 text-gray-300'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-sm ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-700/60 text-gray-300'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;
