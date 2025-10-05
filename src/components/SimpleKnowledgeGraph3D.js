import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SimpleKnowledgeGraph3D = ({ papers, mode = 'connections', onNodeClick, onNodeHover }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef();

  // Categorize papers
  const categorizedPapers = React.useMemo(() => {
    const categories = {};
    papers.forEach(paper => {
      if (!categories[paper.category]) {
        categories[paper.category] = [];
      }
      categories[paper.category].push(paper);
    });
    return categories;
  }, [papers]);

  // Color mapping for categories
  const categoryColors = {
    'Space Biology': '#ef4444',
    'Health & Medicine': '#22c55e',
    'Plant Biology': '#3b82f6',
    'Radiation': '#f59e0b',
    'Cellular Biology': '#8b5cf6',
    'Biotechnology': '#06b6d4',
    'Space Medicine': '#ec4899',
    'Engineering & Technology': '#84cc16'
  };

  // Generate 3D positions for papers
  const generatePositions = (papers) => {
    return papers.map((paper, index) => {
      const angle = (index / papers.length) * Math.PI * 2;
      const radius = 4 + (paper.citations / 50) * 2;
      const height = (Math.random() - 0.5) * 4;
      
      return {
        x: Math.cos(angle) * radius,
        y: height,
        z: Math.sin(angle) * radius,
        paper
      };
    });
  };

  // Generate cluster positions
  const generateClusterPositions = () => {
    const positions = [];
    const categories = Object.keys(categorizedPapers);
    const radius = 6;
    
    categories.forEach((category, categoryIndex) => {
      const categoryPapers = categorizedPapers[category];
      const clusterAngle = (categoryIndex / categories.length) * Math.PI * 2;
      const clusterCenter = {
        x: Math.cos(clusterAngle) * radius,
        y: 0,
        z: Math.sin(clusterAngle) * radius
      };
      
      categoryPapers.forEach((paper, paperIndex) => {
        const paperAngle = (paperIndex / categoryPapers.length) * Math.PI * 2;
        const paperRadius = 1.5 + Math.random() * 1;
        
        positions.push({
          x: clusterCenter.x + Math.cos(paperAngle) * paperRadius,
          y: clusterCenter.y + (Math.random() - 0.5) * 2,
          z: clusterCenter.z + Math.sin(paperAngle) * paperRadius,
          paper,
          category
        });
      });
    });
    
    return positions;
  };

  const positions = mode === 'clusters' ? generateClusterPositions() : generatePositions(papers);

  // Mouse event handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.3, Math.min(2, prev * delta)));
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('wheel', handleWheel);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isDragging, dragStart]);

  const handleNodeClick = (paper) => {
    setSelectedNode(paper);
    if (onNodeClick) onNodeClick(paper);
  };

  const handleNodeHover = (paper) => {
    setHoveredNode(paper);
    if (onNodeHover) onNodeHover(paper);
  };

  const getNodeSize = (paper) => {
    const baseSize = 0.3;
    const citationSize = (paper.citations / 100) * 0.7;
    return baseSize + citationSize;
  };

  const getNodeColor = (paper) => {
    return categoryColors[paper.category] || '#60a5fa';
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* 3D Container */}
      <div
        ref={containerRef}
        className="w-full h-full relative cursor-grab active:cursor-grabbing"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* 3D Scene */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `
              rotateX(${rotation.x}rad) 
              rotateY(${rotation.y}rad) 
              scale(${zoom})
            `,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          {/* 3D Nodes */}
          {positions.map((pos, index) => {
            const size = getNodeSize(pos.paper);
            const color = getNodeColor(pos.paper);
            const isActive = selectedNode?.id === pos.paper.id;
            const isHovered = hoveredNode?.id === pos.paper.id;
            
            return (
              <motion.div
                key={pos.paper.id}
                className="absolute"
                style={{
                  transform: `translate3d(${pos.x * 50}px, ${pos.y * 50}px, ${pos.z * 50}px)`,
                  transformStyle: 'preserve-3d'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isHovered ? 1.3 : isActive ? 1.2 : 1,
                  opacity: 1
                }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.01
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* 3D Node */}
                <div
                  className="relative cursor-pointer"
                  onClick={() => handleNodeClick(pos.paper)}
                  onMouseEnter={() => handleNodeHover(pos.paper)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    width: `${size * 100}px`,
                    height: `${size * 100}px`,
                    transform: 'translateZ(20px)'
                  }}
                >
                  {/* Node Sphere */}
                  <div
                    className="w-full h-full rounded-full shadow-lg"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${color}aa, ${color}88, ${color}66)`,
                      boxShadow: `
                        0 0 ${size * 20}px ${color}44,
                        inset 0 0 ${size * 10}px ${color}88,
                        0 ${size * 5}px ${size * 15}px rgba(0,0,0,0.3)
                      `,
                      border: `2px solid ${color}cc`,
                      transform: 'translateZ(10px)'
                    }}
                  />
                  
                  {/* Node Glow */}
                  <div
                    className="absolute inset-0 rounded-full opacity-50"
                    style={{
                      background: `radial-gradient(circle, ${color}22, transparent)`,
                      transform: 'translateZ(5px)',
                      animation: isActive ? 'pulse 2s infinite' : 'none'
                    }}
                  />
                  
                  {/* Citation Count */}
                  <div
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-black/50 px-2 py-1 rounded-full"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    {pos.paper.citations}
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {/* 3D Connections */}
          {mode === 'connections' && positions.map((pos, index) => {
            if (!pos.paper.relatedPapers) return null;
            
            return pos.paper.relatedPapers.map((relatedPaper, relIndex) => {
              const relatedPos = positions.find(p => p.paper.id === relatedPaper.id);
              if (!relatedPos) return null;
              
              const distance = Math.sqrt(
                Math.pow(pos.x - relatedPos.x, 2) +
                Math.pow(pos.y - relatedPos.y, 2) +
                Math.pow(pos.z - relatedPos.z, 2)
              );
              
              if (distance > 8) return null; // Only show close connections
              
              const angle = Math.atan2(relatedPos.z - pos.z, relatedPos.x - pos.x);
              const length = distance * 50;
              
              return (
                <div
                  key={`${pos.paper.id}-${relatedPaper.id}`}
                  className="absolute origin-left"
                  style={{
                    left: `${pos.x * 50}px`,
                    top: `${pos.y * 50}px`,
                    width: `${length}px`,
                    height: '2px',
                    background: 'linear-gradient(90deg, #60a5fa44, #60a5fa88, #60a5fa44)',
                    transform: `rotate(${angle}rad) translateZ(5px)`,
                    transformOrigin: 'left center',
                    boxShadow: '0 0 10px #60a5fa44'
                  }}
                />
              );
            });
          })}
        </div>
      </div>
      
      {/* Hover Info */}
      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg p-4 max-w-sm z-10"
        >
          <h3 className="text-white font-semibold mb-2 text-sm">
            {hoveredNode.title.length > 50 
              ? hoveredNode.title.substring(0, 50) + '...' 
              : hoveredNode.title
            }
          </h3>
          <p className="text-gray-300 text-xs mb-1">{hoveredNode.category}</p>
          <p className="text-blue-400 text-xs">{hoveredNode.citations} citations</p>
        </motion.div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg p-3 max-w-xs z-10">
        <div className="text-xs text-gray-300">
          <p className="font-semibold text-white mb-1">3D Controls:</p>
          <p>• Drag to rotate</p>
          <p>• Scroll to zoom</p>
          <p>• Click nodes to select</p>
          <p>• Hover for details</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleKnowledgeGraph3D;
