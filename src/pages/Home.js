import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import PaperTile from '../components/PaperTile';
import { FaFilter, FaSpinner, FaStar } from 'react-icons/fa';
import { fetchPapers } from '../services/api';

// Generate random stars for background
const generateStars = (count) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      size: Math.random() * 2 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5
    });
  }
  return stars;
};

const Home = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const location = useLocation();
  const [stars] = useState(() => generateStars(50));

  // Category options - updated to match the actual categories in the data
  const categories = [
    { id: 'all', name: 'All Papers' },
    { id: 'health', name: 'Health & Medicine' },
    { id: 'engineering', name: 'Engineering & Technology' },
    { id: 'astrobiology', name: 'Astrobiology' },
    { id: 'biotechnology', name: 'Biotechnology' }
  ];

  useEffect(() => {
    const loadPapers = async () => {
      setLoading(true);
      try {
        // Extract search query if present
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get('search');
        
        // Map 'all' to null, otherwise use the filter value
        const categoryFilter = activeFilter === 'all' ? null : activeFilter;
        
        const data = await fetchPapers(searchTerm, categoryFilter);
        setPapers(data);
      } catch (error) {
        console.error('Error loading papers:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPapers();
  }, [location.search, activeFilter]);

  return (
    <div className="relative">
      {/* Stars background */}
      {stars.map(star => (
        <div 
          key={star.id}
          className="star" 
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12 mt-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            NASA Bioscience Research Explorer
          </motion.h1>
          <motion.p 
            className="text-gray-300 max-w-3xl mx-auto text-lg"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover groundbreaking space biology research enabling human exploration of the Moon and Mars
          </motion.p>
        </div>

        {/* Filter tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-2">
            <div className="flex items-center mr-2 text-indigo-300">
              <FaFilter className="mr-2" />
              <span className="text-sm">Filter:</span>
            </div>
            
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeFilter === category.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-800/60 text-gray-300 hover:bg-slate-700/60'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Papers grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-blue-500 mr-3" size={24} />
            <span className="text-blue-300">Loading research papers...</span>
          </div>
        ) : (
          papers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {papers.map(paper => (
                <PaperTile key={paper.id} paper={paper} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FaStar className="text-yellow-500 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-white mb-2">No papers found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )
        )}
      </motion.div>
    </div>
  );
};

export default Home;
