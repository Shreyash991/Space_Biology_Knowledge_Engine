import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaExpand, FaCompress, FaRedo, FaInfoCircle } from 'react-icons/fa';
import SimpleKnowledgeGraph3D from '../components/SimpleKnowledgeGraph3D';
import { fetchPapers } from '../services/api';

const KnowledgeGraph3DPage = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('connections');
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [hoveredPaper, setHoveredPaper] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadPapers();
  }, []);

  const loadPapers = async () => {
    try {
      setLoading(true);
      const allPapers = await fetchPapers();
      setPapers(allPapers);
    } catch (error) {
      console.error('Error loading papers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNodeClick = (paper) => {
    setSelectedPaper(paper);
    navigate(`/paper/${paper.id}`);
  };

  const handleNodeHover = (paper) => {
    setHoveredPaper(paper);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const resetView = () => {
    // This would reset the 3D camera view
    window.location.reload();
  };

  const getModeStats = () => {
    switch (mode) {
      case 'connections':
        const totalConnections = papers.reduce((acc, paper) => 
          acc + (paper.relatedPapers?.length || 0), 0
        );
        return {
          totalPapers: papers.length,
          totalConnections,
          avgConnections: papers.length > 0 ? (totalConnections / papers.length).toFixed(1) : 0
        };
      case 'clusters':
        const categories = [...new Set(papers.map(p => p.category))];
        const largestCluster = Math.max(...categories.map(cat => 
          papers.filter(p => p.category === cat).length
        ));
        return {
          totalPapers: papers.length,
          totalClusters: categories.length,
          largestCluster
        };
      case 'citations':
        const totalCitations = papers.reduce((acc, paper) => acc + paper.citations, 0);
        const maxCitations = Math.max(...papers.map(p => p.citations));
        return {
          totalPapers: papers.length,
          totalCitations,
          maxCitations
        };
      default:
        return { totalPapers: papers.length, totalConnections: 0, avgConnections: 0 };
    }
  };

  const stats = getModeStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading 3D Knowledge Graph...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-900 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="bg-slate-800/90 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition"
              >
                <FaArrowLeft />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">3D Knowledge Graph</h1>
                <p className="text-gray-400">Explore research relationships in 3D space</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Mode Selector */}
              <div className="flex bg-slate-700 rounded-lg p-1">
                {[
                  { key: 'connections', label: 'Research Connections' },
                  { key: 'clusters', label: 'Topic Clusters' },
                  { key: 'citations', label: 'Citation Network' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setMode(key)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                      mode === key
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-slate-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              
              {/* Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={resetView}
                  className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition"
                  title="Reset View"
                >
                  <FaRedo />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                >
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="container mx-auto px-4 py-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mode === 'connections' && (
              <>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{stats.totalPapers}</div>
                  <div className="text-sm text-gray-400">Total Papers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{stats.totalConnections}</div>
                  <div className="text-sm text-gray-400">Total Connections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{stats.avgConnections}</div>
                  <div className="text-sm text-gray-400">Avg Connections</div>
                </div>
              </>
            )}
            {mode === 'clusters' && (
              <>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{stats.totalPapers}</div>
                  <div className="text-sm text-gray-400">Total Papers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{stats.totalClusters}</div>
                  <div className="text-sm text-gray-400">Topic Clusters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{stats.largestCluster}</div>
                  <div className="text-sm text-gray-400">Largest Cluster</div>
                </div>
              </>
            )}
            {mode === 'citations' && (
              <>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{stats.totalPapers}</div>
                  <div className="text-sm text-gray-400">Total Papers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{stats.totalCitations}</div>
                  <div className="text-sm text-gray-400">Total Citations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{stats.maxCitations}</div>
                  <div className="text-sm text-gray-400">Highest Citations</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 3D Visualization */}
      <div className={`${isFullscreen ? 'h-screen' : 'h-[calc(100vh-200px)]'}`}>
        <SimpleKnowledgeGraph3D
          papers={papers}
          mode={mode}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
        />
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg p-4 max-w-sm">
        <div className="flex items-start space-x-2">
          <FaInfoCircle className="text-blue-400 mt-1" />
          <div className="text-sm text-gray-300">
            <p className="font-semibold text-white mb-2">3D Controls:</p>
            <ul className="space-y-1">
              <li>• <strong>Mouse:</strong> Rotate, zoom, pan</li>
              <li>• <strong>Click:</strong> Select paper</li>
              <li>• <strong>Hover:</strong> View details</li>
              <li>• <strong>Scroll:</strong> Zoom in/out</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Selected Paper Info */}
      {selectedPaper && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 right-4 bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg p-4 max-w-sm"
        >
          <h3 className="text-white font-semibold mb-2">{selectedPaper.title}</h3>
          <p className="text-gray-300 text-sm mb-2">{selectedPaper.category}</p>
          <p className="text-blue-400 text-sm mb-2">{selectedPaper.citations} citations</p>
          <button
            onClick={() => setSelectedPaper(null)}
            className="text-gray-400 hover:text-white text-sm"
          >
            Close
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default KnowledgeGraph3DPage;
