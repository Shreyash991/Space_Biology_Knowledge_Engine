import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const KnowledgeGraph2D = ({ papers, mode = 'connections', onNodeClick, onNodeHover }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef();
  const containerRef = useRef();

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

  // Generate node positions
  const generatePositions = (papers) => {
    return papers.map((paper, index) => {
      const angle = (index / papers.length) * Math.PI * 2;
      const radius = 150 + (paper.citations / 50) * 100;
      
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        paper,
        id: paper.id
      };
    });
  };

  // Generate cluster positions
  const generateClusterPositions = () => {
    const positions = [];
    const categories = {};
    
    // Group papers by category
    papers.forEach(paper => {
      if (!categories[paper.category]) {
        categories[paper.category] = [];
      }
      categories[paper.category].push(paper);
    });

    const categoryNames = Object.keys(categories);
    const clusterRadius = 240; // spread clusters a bit more to avoid overlaps
    
    categoryNames.forEach((category, categoryIndex) => {
      const categoryPapers = categories[category];
      const clusterAngle = (categoryIndex / categoryNames.length) * Math.PI * 2;
      const clusterCenter = {
        x: Math.cos(clusterAngle) * clusterRadius,
        y: Math.sin(clusterAngle) * clusterRadius
      };
      
      categoryPapers.forEach((paper, paperIndex) => {
        const paperAngle = (paperIndex / categoryPapers.length) * Math.PI * 2;
        // Larger local radius to reduce internal overlap
        const paperRadius = 60 + Math.random() * 50;
        
        positions.push({
          x: clusterCenter.x + Math.cos(paperAngle) * paperRadius,
          y: clusterCenter.y + Math.sin(paperAngle) * paperRadius,
          paper,
          category,
          id: paper.id
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
    
    setPan(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
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

  const handleCanvasMouseMove = (e) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom - pan.x;
    const y = (e.clientY - rect.top) / zoom - pan.y;
    
    // Find hovered node
    const hovered = positions.find(pos => {
      const distance = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
      return distance <= getNodeSize(pos.paper);
    });
    
    if (hovered !== hoveredNode) {
      setHoveredNode(hovered);
      onNodeHover?.(hovered?.paper);
      
      // Show tooltip
      if (hovered) {
        setTooltip({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          title: hovered.paper.title,
          category: hovered.paper.category,
          citations: hovered.paper.citations,
          keywords: hovered.paper.keywords?.slice(0, 3)
        });
      } else {
        setTooltip(null);
      }
    }
  };

  const handleNodeClick = (paper) => {
    setSelectedNode(paper);
    if (onNodeClick) onNodeClick(paper);
  };

  const handleNodeHover = (paper) => {
    setHoveredNode(paper);
    if (onNodeHover) onNodeHover(paper);
  };

  const getNodeSize = (paper) => {
    const baseSize = 8;
    const citationSize = (paper.citations / 100) * 12;
    return baseSize + citationSize;
  };

  const getNodeColor = (paper) => {
    return categoryColors[paper.category] || '#60a5fa';
  };

  // Draw connections
  const drawConnections = (ctx, positions) => {
    if (mode !== 'connections') return;
    
    positions.forEach(pos => {
      if (!pos.paper.relatedPapers) return;
      
      pos.paper.relatedPapers.forEach(relatedPaper => {
        const relatedPos = positions.find(p => p.paper.id === relatedPaper.id);
        if (!relatedPos) return;
        
        const distance = Math.sqrt(
          Math.pow(pos.x - relatedPos.x, 2) + Math.pow(pos.y - relatedPos.y, 2)
        );
        
        if (distance > 300) return; // Only show close connections
        
        // Check if this connection should be highlighted
        const isHoveredConnection = hoveredNode && 
          (hoveredNode.id === pos.paper.id || hoveredNode.id === relatedPaper.id);
        
        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(relatedPos.x, relatedPos.y);
        ctx.strokeStyle = isHoveredConnection ? '#60a5fa88' : '#60a5fa44';
        ctx.lineWidth = isHoveredConnection ? 3 : 2;
        ctx.stroke();
        
        // Draw arrow at the end
        const angle = Math.atan2(relatedPos.y - pos.y, relatedPos.x - pos.x);
        const arrowLength = 8;
        const arrowAngle = Math.PI / 6;
        
        ctx.beginPath();
        ctx.moveTo(relatedPos.x, relatedPos.y);
        ctx.lineTo(
          relatedPos.x - arrowLength * Math.cos(angle - arrowAngle),
          relatedPos.y - arrowLength * Math.sin(angle - arrowAngle)
        );
        ctx.moveTo(relatedPos.x, relatedPos.y);
        ctx.lineTo(
          relatedPos.x - arrowLength * Math.cos(angle + arrowAngle),
          relatedPos.y - arrowLength * Math.sin(angle + arrowAngle)
        );
        ctx.strokeStyle = isHoveredConnection ? '#60a5faaa' : '#60a5fa88';
        ctx.lineWidth = isHoveredConnection ? 3 : 2;
        ctx.stroke();
      });
    });
  };

  // Draw nodes
  const drawNodes = (ctx, positions) => {
    positions.forEach(pos => {
      const size = getNodeSize(pos.paper);
      const color = getNodeColor(pos.paper);
      const isActive = selectedNode?.id === pos.paper.id;
      const isHovered = hoveredNode?.id === pos.paper.id;
      
      // Node circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Node border
      ctx.strokeStyle = isActive ? '#ffffff' : color + 'cc';
      ctx.lineWidth = isActive ? 3 : 2;
      ctx.stroke();
      
      // Node glow
      if (isHovered || isActive) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size + 5, 0, Math.PI * 2);
        ctx.strokeStyle = color + '66';
        ctx.lineWidth = 8;
        ctx.stroke();
      }
      
      // Citation count
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(pos.paper.citations.toString(), pos.x, pos.y + 3);
      
      // Show title on hover
      if (isHovered) {
        // Draw title background
        const title = pos.paper.title.length > 30 
          ? pos.paper.title.substring(0, 30) + '...' 
          : pos.paper.title;
        
        ctx.font = 'bold 12px Arial';
        const textWidth = ctx.measureText(title).width;
        const padding = 8;
        const rectWidth = textWidth + padding * 2;
        const rectHeight = 20;
        
        // Draw background rectangle
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(
          pos.x - rectWidth / 2, 
          pos.y - size - rectHeight - 10, 
          rectWidth, 
          rectHeight
        );
        
        // Draw border
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(
          pos.x - rectWidth / 2, 
          pos.y - size - rectHeight - 10, 
          rectWidth, 
          rectHeight
        );
        
        // Draw title text
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(title, pos.x, pos.y - size - 2);
      }
    });
  };

  // Draw cluster labels
  const drawClusterLabels = (ctx, positions) => {
    if (mode !== 'clusters') return;
    
    const categories = {};
    positions.forEach(pos => {
      if (!categories[pos.category]) {
        categories[pos.category] = { positions: [], center: { x: 0, y: 0 } };
      }
      categories[pos.category].positions.push(pos);
    });
    
    Object.entries(categories).forEach(([category, data]) => {
      // Calculate cluster center
      const centerX = data.positions.reduce((sum, pos) => sum + pos.x, 0) / data.positions.length;
      const centerY = data.positions.reduce((sum, pos) => sum + pos.y, 0) / data.positions.length;
      // Estimate cluster radius (furthest node from center)
      const maxR = data.positions.reduce((max, pos) => {
        const r = Math.hypot(pos.x - centerX, pos.y - centerY) + getNodeSize(pos.paper);
        return Math.max(max, r);
      }, 0);
      const labelY = centerY - (maxR + 24); // place label above cluster edge
      
      // Label background for readability
      ctx.font = 'bold 16px Arial';
      const text = category;
      const textWidth = ctx.measureText(text).width;
      const paddingX = 8;
      const paddingY = 4;
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(centerX - textWidth / 2 - paddingX, labelY - 14 - paddingY, textWidth + paddingX * 2, 20 + paddingY * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(centerX - textWidth / 2 - paddingX, labelY - 14 - paddingY, textWidth + paddingX * 2, 20 + paddingY * 2);
      
      // Draw cluster label text
      ctx.fillStyle = categoryColors[category] || '#60a5fa';
      ctx.textAlign = 'center';
      ctx.fillText(text, centerX, labelY);
    });
  };

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Apply transformations
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);
    
    // Draw connections first
    drawConnections(ctx, positions);
    
    // Draw nodes
    drawNodes(ctx, positions);
    
    // Draw cluster labels
    drawClusterLabels(ctx, positions);
    
    ctx.restore();
  }, [positions, pan, zoom, selectedNode, hoveredNode, mode]);

  // Event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('wheel', handleWheel);
    container.addEventListener('mousemove', handleCanvasMouseMove);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousemove', handleCanvasMouseMove);
    };
  }, [isDragging, dragStart, handleCanvasMouseMove]);

  return (
    <div className="w-full h-full relative">
      {/* Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ minHeight: '400px' }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}
        />
        
        {/* Interactive Nodes Overlay */}
        {positions.map((pos) => {
          const size = getNodeSize(pos.paper);
          const isActive = selectedNode?.id === pos.paper.id;
          const isHovered = hoveredNode?.id === pos.paper.id;
          
          return (
            <div
              key={pos.paper.id}
              className="absolute cursor-pointer"
              style={{
                left: `${pos.x + pan.x}px`,
                top: `${pos.y + pan.y}px`,
                transform: `translate(-50%, -50%) scale(${zoom})`,
                zIndex: isActive ? 20 : isHovered ? 15 : 10
              }}
              onClick={() => handleNodeClick(pos.paper)}
              onMouseEnter={() => handleNodeHover(pos.paper)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <motion.div
                className="relative"
                animate={{
                  scale: isHovered ? 1.2 : isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Node Tooltip */}
                {(isHovered || isActive) && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg p-2 max-w-xs z-30">
                    <h4 className="text-white font-semibold text-sm mb-1">
                      {pos.paper.title.length > 40 
                        ? pos.paper.title.substring(0, 40) + '...' 
                        : pos.paper.title
                      }
                    </h4>
                    <p className="text-gray-300 text-xs mb-1">{pos.paper.category}</p>
                    <p className="text-blue-400 text-xs">{pos.paper.citations} citations</p>
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button
          onClick={() => setZoom(prev => Math.min(2, prev * 1.2))}
          className="w-8 h-8 bg-slate-700 hover:bg-slate-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
        >
          +
        </button>
        <button
          onClick={() => setZoom(prev => Math.max(0.3, prev * 0.8))}
          className="w-8 h-8 bg-slate-700 hover:bg-slate-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
        >
          -
        </button>
        <button
          onClick={() => {
            setPan({ x: 0, y: 0 });
            setZoom(1);
          }}
          className="w-8 h-8 bg-slate-700 hover:bg-slate-600 text-white rounded-full flex items-center justify-center text-xs"
          title="Reset View"
        >
          ↻
        </button>
      </div>
      
      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute bg-slate-900/95 text-white p-3 rounded-lg shadow-lg border border-slate-700 max-w-xs z-10"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="text-sm font-semibold mb-1">{tooltip.title}</div>
          <div className="text-xs text-gray-300 mb-2">{tooltip.category}</div>
          <div className="text-xs text-blue-300">
            Citations: {tooltip.citations} | Keywords: {tooltip.keywords?.join(', ')}
          </div>
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg p-3 max-w-xs">
        <div className="text-xs text-gray-300">
          <p className="font-semibold text-white mb-1">Graph Controls:</p>
          <p>• Drag to pan</p>
          <p>• Scroll to zoom</p>
          <p>• Click nodes to select</p>
          <p>• Hover for details</p>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph2D;
