import React from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaExternalLinkAlt, FaQuoteRight, FaUsers, FaCalendarAlt, FaTag } from 'react-icons/fa';
import ResearchDataVisualization from './ResearchDataVisualization';

const PaperSummary = ({ paper }) => {
  // Ensure we have arrays even if they're missing in the data
  const findings = paper.findings || paper.relatedStudies || [];
  const keywords = paper.keywords || [];
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800/50 border border-indigo-800/30 rounded-xl p-6 shadow-lg"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{paper.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-300 gap-x-4 gap-y-2">
            <div className="flex items-center">
              <FaUsers className="mr-2 text-blue-400" />
              {paper.authors.join(", ")}
            </div>
            
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-blue-400" />
              {new Date(paper.publishedDate || paper.publicationDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            
            <div className="flex items-center">
              <FaTag className="mr-2 text-blue-400" />
              {paper.category}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <a 
            href={paper.pdfUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
          >
            <FaFilePdf className="mr-2" /> View PDF
          </a>
          
          <a 
            href={paper.doi} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-indigo-800/50 hover:bg-indigo-700/50 text-white rounded-lg text-sm border border-indigo-700/50 transition"
          >
            <FaExternalLinkAlt className="mr-2" /> Source
          </a>
        </div>
      </div>

      <div className="bg-indigo-900/20 border-l-4 border-blue-500 p-4 mb-6 rounded">
        <h2 className="text-lg font-semibold text-blue-300 mb-2">Abstract</h2>
        <p className="text-gray-200">{paper.abstract}</p>
      </div>

      {findings.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-blue-300 mb-3">
            {paper.findings ? 'Key Findings' : 'Related Studies'}
          </h2>
          <ul className="space-y-3">
            {findings.map((item, i) => (
              <li key={i} className="flex">
                <div className="mr-4 mt-1">
                  <div className="w-6 h-6 rounded-full bg-blue-700/30 border border-blue-600/50 flex items-center justify-center text-sm">
                    {i + 1}
                  </div>
                </div>
                <p className="text-gray-300">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-blue-300 mb-3">Impact & Significance</h2>
        <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600/30">
          <div className="flex mb-2">
            <FaQuoteRight className="text-blue-400 mr-3 mt-1" />
            <p className="text-gray-200 italic">{paper.significance}</p>
          </div>
        </div>
      </div>

      {keywords.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-blue-300 mb-3">Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, i) => (
              <span 
                key={i}
                className="px-3 py-1 bg-indigo-800/30 text-indigo-200 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Research Data Visualization */}
      <ResearchDataVisualization paper={paper} />
    </motion.div>
  );
};

export default PaperSummary;
