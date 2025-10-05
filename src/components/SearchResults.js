import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaClock, FaStar, FaTag, FaFileAlt, FaQuoteLeft, FaTimes } from 'react-icons/fa';
import PaperTile from './PaperTile';

const SearchResults = ({ searchResults, onClose }) => {
  if (!searchResults) return null;

  const { query, results, totalFound, searchTime } = searchResults;

  const getRelevanceColor = (score) => {
    if (score >= 15) return 'text-green-400';
    if (score >= 10) return 'text-yellow-400';
    if (score >= 5) return 'text-orange-400';
    return 'text-gray-400';
  };

  const getRelevanceLabel = (score) => {
    if (score >= 15) return 'Highly Relevant';
    if (score >= 10) return 'Very Relevant';
    if (score >= 5) return 'Relevant';
    return 'Somewhat Relevant';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-16 z-50 overflow-y-auto">
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-6xl mx-4 mb-8">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white flex items-center">
                <FaSearch className="mr-2 text-blue-400" />
                Search Results
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Found {totalFound} papers for "{query}" in {Math.round(searchTime)}ms
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition p-2"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="p-6">
          {results.length === 0 ? (
            <div className="text-center py-12">
              <FaSearch className="mx-auto text-gray-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-white mb-2">No Results Found</h3>
              <p className="text-gray-400 mb-4">
                Try different keywords or search terms
              </p>
              <div className="bg-slate-700/50 p-4 rounded-lg max-w-md mx-auto">
                <p className="text-sm text-gray-300 mb-2">Search suggestions:</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Try broader terms like "space" or "biology"</li>
                  <li>• Use specific keywords from abstracts</li>
                  <li>• Search by research category</li>
                  <li>• Check spelling of technical terms</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Search Summary */}
              <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">Search Summary</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <FaClock className="mr-1" />
                      {Math.round(searchTime)}ms
                    </span>
                    <span className="flex items-center">
                      <FaFileAlt className="mr-1" />
                      {totalFound} papers
                    </span>
                  </div>
                </div>
                <p className="text-gray-300">
                  Semantic search analyzed abstracts, keywords, citations, and topics to find the most relevant papers for your query.
                </p>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((paper, index) => (
                  <motion.div
                    key={paper.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Relevance Score */}
                    <div className="absolute top-2 right-2 z-10">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium bg-slate-800/80 ${getRelevanceColor(paper.semanticScore)}`}>
                        {paper.semanticScore.toFixed(1)}
                      </div>
                    </div>

                    {/* Enhanced Paper Tile */}
                    <div className="bg-slate-700/50 border border-slate-600/30 rounded-xl p-4 h-full hover:bg-slate-700/70 transition">
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium bg-blue-900/40 text-blue-200 px-2 py-1 rounded-full">
                            {paper.category}
                          </span>
                          <span className={`text-xs ${getRelevanceColor(paper.semanticScore)}`}>
                            {getRelevanceLabel(paper.semanticScore)}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                          {paper.title}
                        </h3>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-300 line-clamp-3 mb-3">
                          {paper.abstract}
                        </p>
                        
                        {/* Highlighted Keywords */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {paper.keywords.slice(0, 3).map((keyword, i) => (
                            <span 
                              key={i} 
                              className="text-xs bg-indigo-800/30 text-indigo-200 px-2 py-0.5 rounded-full"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                          <span>{paper.authors.slice(0, 2).join(', ')}</span>
                          <span>{paper.citations} citations</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {new Date(paper.publishedDate || paper.publicationDate).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => window.location.href = `/paper/${paper.id}`}
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition"
                          >
                            View Paper →
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Search Insights */}
              {results.length > 0 && (
                <div className="mt-8 bg-slate-700/30 border border-slate-600/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <FaQuoteLeft className="mr-2 text-blue-400" />
                    Search Insights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 mb-1">Most Common Category</div>
                      <div className="text-white font-medium">
                        {(() => {
                          const categoryCounts = results.reduce((acc, paper) => {
                            acc[paper.category] = (acc[paper.category] || 0) + 1;
                            return acc;
                          }, {});
                          const mostCommon = Object.entries(categoryCounts)
                            .sort(([,a], [,b]) => b - a)[0];
                          return mostCommon ? `${mostCommon[0]} (${mostCommon[1]})` : 'N/A';
                        })()}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-1">Average Citations</div>
                      <div className="text-white font-medium">
                        {Math.round(results.reduce((sum, paper) => sum + paper.citations, 0) / results.length)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-1">Publication Range</div>
                      <div className="text-white font-medium">
                        {(() => {
                          const years = results.map(p => new Date(p.publishedDate || p.publicationDate).getFullYear());
                          return years.length > 0 ? `${Math.min(...years)} - ${Math.max(...years)}` : 'N/A';
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
