import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaperTile = ({ paper }) => {
  // Generate a gradient based on the paper's id
  const gradientIndex = paper.id % 5;
  const gradients = [
    'from-blue-600/20 to-indigo-700/20',
    'from-purple-600/20 to-pink-700/20',
    'from-green-600/20 to-teal-700/20',
    'from-orange-600/20 to-red-700/20',
    'from-cyan-600/20 to-blue-700/20'
  ];
  
  const gradient = gradients[gradientIndex];
  
  // Format date - handle both publishedDate and publicationDate
  const dateString = paper.publishedDate || paper.publicationDate;
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });

  // Make sure keywords is an array
  const keywords = paper.keywords || [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link 
        to={`/paper/${paper.id}`} 
        className={`paper-tile block rounded-xl p-6 h-full border border-indigo-500/20 bg-gradient-to-br ${gradient} hover:border-indigo-500/50`}
      >
        <div className="flex flex-col h-full">
          <div className="mb-3 flex justify-between items-start">
            <span className="text-xs font-medium bg-blue-900/40 text-blue-200 px-2 py-1 rounded-full">
              {paper.category}
            </span>
            <span className="text-xs text-gray-400">{formattedDate}</span>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 text-white">{paper.title}</h3>
          
          <p className="text-sm text-gray-300 mb-4 flex-grow line-clamp-3">
            {paper.abstract}
          </p>
          
          <div className="mt-auto">
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {keywords.slice(0, 3).map((keyword, i) => (
                  <span 
                    key={i} 
                    className="text-xs bg-indigo-800/30 text-indigo-200 px-2 py-0.5 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {paper.authors.slice(0, 3).map((author, i) => (
                  <div 
                    key={i} 
                    className="w-7 h-7 rounded-full bg-indigo-700/50 border border-indigo-600 flex items-center justify-center text-xs"
                    title={author}
                  >
                    {author.charAt(0)}
                  </div>
                ))}
              </div>
              {paper.authors.length > 3 && (
                <span className="text-xs text-gray-400 ml-2">+{paper.authors.length - 3} more</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PaperTile;
