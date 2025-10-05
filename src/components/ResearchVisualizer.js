import React, { useEffect, useRef, useState, useCallback } from 'react';

// Enhanced ResearchVisualizer with topic clustering, citation network, and sophisticated interactions
const ResearchVisualizer = ({ papers, activePaperId, mode = 'connections' }) => {
  const canvasRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPan, setLastPan] = useState({ x: 0, y: 0 });
  
  // Color schemes for different modes
  const colorSchemes = {
    connections: {
      active: '#60a5fa',
      inactive: '#818cf8',
      link: 'rgba(99, 102, 241, 0.3)',
      hover: '#3b82f6'
    },
    clusters: {
      cluster1: '#ef4444', // red
      cluster2: '#3b82f6', // blue
      cluster3: '#10b981', // green
      cluster4: '#f59e0b', // yellow
      cluster5: '#8b5cf6', // purple
      cluster6: '#06b6d4', // cyan
      link: 'rgba(255, 255, 255, 0.2)',
      hover: '#ffffff'
    },
    citations: {
      high: '#ef4444',    // high citations
      medium: '#f59e0b',  // medium citations
      low: '#6b7280',     // low citations
      link: 'rgba(59, 130, 246, 0.6)',
      hover: '#3b82f6'
    }
  };

  // Topic clustering algorithm
  const clusterPapers = useCallback((papers) => {
    const clusters = {};
    const clusterColors = Object.keys(colorSchemes.clusters).filter(key => key.startsWith('cluster'));
    
    papers.forEach((paper, index) => {
      const primaryKeyword = paper.keywords[0]?.toLowerCase() || 'general';
      const category = paper.category?.toLowerCase() || 'other';
      
      // Create cluster key based on primary keyword and category
      const clusterKey = `${category}-${primaryKeyword}`;
      
      if (!clusters[clusterKey]) {
        clusters[clusterKey] = {
          papers: [],
          color: clusterColors[Object.keys(clusters).length % clusterColors.length],
          label: `${category.charAt(0).toUpperCase() + category.slice(1)}: ${primaryKeyword}`
        };
      }
      
      clusters[clusterKey].papers.push({
        ...paper,
        clusterColor: clusters[clusterKey].color
      });
    });
    
    return clusters;
  }, []);

  // Citation network analysis
  const analyzeCitations = useCallback((papers) => {
    const maxCitations = Math.max(...papers.map(p => p.citations || 0));
    const minCitations = Math.min(...papers.map(p => p.citations || 0));
    
    return papers.map(paper => {
      const citations = paper.citations || 0;
      const normalizedCitations = (citations - minCitations) / (maxCitations - minCitations || 1);
      
      let citationLevel = 'low';
      if (normalizedCitations > 0.7) citationLevel = 'high';
      else if (normalizedCitations > 0.3) citationLevel = 'medium';
      
      return {
        ...paper,
        citationLevel,
        normalizedCitations
      };
    });
  }, []);

  // Force-directed layout algorithm
  const applyForceLayout = useCallback((nodes, links, width, height) => {
    const force = 0.1;
    const damping = 0.9;
    const iterations = 50;
    
    for (let i = 0; i < iterations; i++) {
      // Repulsion between all nodes
      for (let j = 0; j < nodes.length; j++) {
        for (let k = j + 1; k < nodes.length; k++) {
          const dx = nodes[j].x - nodes[k].x;
          const dy = nodes[j].y - nodes[k].y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          const repulsion = force * 100 / (distance * distance);
          
          nodes[j].vx += (dx / distance) * repulsion;
          nodes[j].vy += (dy / distance) * repulsion;
          nodes[k].vx -= (dx / distance) * repulsion;
          nodes[k].vy -= (dy / distance) * repulsion;
        }
      }
      
      // Attraction between connected nodes
      links.forEach(link => {
        if (link.source && link.target) {
          const dx = link.target.x - link.source.x;
          const dy = link.target.y - link.source.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          const attraction = force * distance * 0.1;
          
          link.source.vx += (dx / distance) * attraction;
          link.source.vy += (dy / distance) * attraction;
          link.target.vx -= (dx / distance) * attraction;
          link.target.vy -= (dy / distance) * attraction;
        }
      });
      
      // Apply forces and update positions
      nodes.forEach(node => {
        node.vx *= damping;
        node.vy *= damping;
        node.x += node.vx;
        node.y += node.vy;
        
        // Keep nodes within bounds
        node.x = Math.max(50, Math.min(width - 50, node.x));
        node.y = Math.max(50, Math.min(height - 50, node.y));
      });
    }
  }, []);

  // Mouse event handlers
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setLastPan({ x: pan.x, y: pan.y });
  }, [pan]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setPan({
      x: lastPan.x + deltaX,
      y: lastPan.y + deltaY
    });
  }, [isDragging, dragStart, lastPan]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.1, Math.min(3, prev * delta)));
  }, []);


  useEffect(() => {
    if (!papers || papers.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas dimensions
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Prepare data based on mode
    let processedPapers = papers;
    let clusters = {};
    let links = [];
    
    if (mode === 'clusters') {
      clusters = clusterPapers(papers);
      processedPapers = Object.values(clusters).flatMap(cluster => cluster.papers);
    } else if (mode === 'citations') {
      processedPapers = analyzeCitations(papers);
    }
    
    // Create nodes
    const nodes = processedPapers.map((paper, i) => {
      const angle = (i / processedPapers.length) * Math.PI * 2;
      const radius = Math.min(canvas.width / dpr, canvas.height / dpr) * 0.3;
      
      return {
        id: paper.id,
        x: canvas.width / dpr / 2 + Math.cos(angle) * radius,
        y: canvas.height / dpr / 2 + Math.sin(angle) * radius,
        radius: paper.id === activePaperId ? 12 : 8,
        title: paper.title,
        authors: paper.authors.slice(0, 2).join(', '),
        category: paper.category,
        citations: paper.citations || 0,
        keywords: paper.keywords || [],
        vx: 0,
        vy: 0,
        color: getNodeColor(paper, mode),
        clusterColor: paper.clusterColor,
        citationLevel: paper.citationLevel,
        normalizedCitations: paper.normalizedCitations
      };
    });
    
    // Create links based on mode
    if (mode === 'connections') {
      papers.forEach(paper => {
        if (paper.relatedPapers) {
          paper.relatedPapers.forEach(related => {
            const sourceNode = nodes.find(n => n.id === paper.id);
            const targetNode = nodes.find(n => n.id === related.id);
            if (sourceNode && targetNode) {
              links.push({
                source: sourceNode,
                target: targetNode,
                strength: 1
              });
            }
          });
        }
      });
    } else if (mode === 'citations') {
      // Create citation links based on shared keywords and categories
      nodes.forEach(source => {
        nodes.forEach(target => {
          if (source.id !== target.id) {
            const sharedKeywords = source.keywords.filter(k => 
              target.keywords.includes(k)
            ).length;
            const sameCategory = source.category === target.category;
            
            if (sharedKeywords > 0 || sameCategory) {
              const strength = (sharedKeywords * 0.5 + (sameCategory ? 0.5 : 0)) / 2;
              if (strength > 0.2) {
                links.push({
                  source,
                  target,
                  strength
                });
              }
            }
          }
        });
      });
    } else if (mode === 'clusters') {
      // Create links within clusters
      Object.values(clusters).forEach(cluster => {
        cluster.papers.forEach(source => {
          cluster.papers.forEach(target => {
            if (source.id !== target.id) {
              const sourceNode = nodes.find(n => n.id === source.id);
              const targetNode = nodes.find(n => n.id === target.id);
              if (sourceNode && targetNode) {
                links.push({
                  source: sourceNode,
                  target: targetNode,
                  strength: 0.8
                });
              }
            }
          });
        });
      });
    }
    
    // Apply force layout
    applyForceLayout(nodes, links, canvas.width / dpr, canvas.height / dpr);
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      
      // Apply zoom and pan
      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);
      
      // Draw links
      links.forEach(link => {
        if (link.source && link.target) {
          const lineWidth = mode === 'citations' ? link.strength * 3 + 1 : 1;
          const alpha = mode === 'citations' ? link.strength * 0.8 + 0.2 : 0.3;
          
          ctx.strokeStyle = mode === 'clusters' ? 
            colorSchemes.clusters.link : 
            `rgba(59, 130, 246, ${alpha})`;
          ctx.lineWidth = lineWidth;
          ctx.beginPath();
          ctx.moveTo(link.source.x, link.source.y);
          ctx.lineTo(link.target.x, link.target.y);
          ctx.stroke();
        }
      });
      
      // Draw cluster backgrounds for cluster mode
      if (mode === 'clusters') {
        Object.values(clusters).forEach(cluster => {
          if (cluster.papers.length > 1) {
            const clusterNodes = cluster.papers.map(p => 
              nodes.find(n => n.id === p.id)
            ).filter(Boolean);
            
            if (clusterNodes.length > 0) {
              const centerX = clusterNodes.reduce((sum, n) => sum + n.x, 0) / clusterNodes.length;
              const centerY = clusterNodes.reduce((sum, n) => sum + n.y, 0) / clusterNodes.length;
              const maxDistance = Math.max(...clusterNodes.map(n => 
                Math.sqrt((n.x - centerX) ** 2 + (n.y - centerY) ** 2)
              ));
              
              // Draw cluster background
              ctx.beginPath();
              ctx.arc(centerX, centerY, maxDistance + 30, 0, Math.PI * 2);
              ctx.fillStyle = `${cluster.color}20`;
              ctx.fill();
              ctx.strokeStyle = cluster.color;
              ctx.lineWidth = 2;
              ctx.stroke();
              
              // Draw cluster label
              ctx.fillStyle = cluster.color;
              ctx.font = 'bold 12px sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText(cluster.label, centerX, centerY - maxDistance - 40);
            }
          }
        });
      }
      
      // Draw nodes
      nodes.forEach(node => {
        // Node glow for active/hovered nodes
        if (node.id === activePaperId || node.id === hoveredNode?.id) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(96, 165, 250, 0.3)';
          ctx.fill();
        }
        
        // Main node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Node border
        ctx.strokeStyle = node.id === activePaperId ? '#ffffff' : 
                         node.id === hoveredNode?.id ? '#3b82f6' : 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Citation indicator for citation mode
        if (mode === 'citations' && node.citations > 0) {
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(node.citations.toString(), node.x, node.y + 3);
        }
      });
      
      ctx.restore();
      
      // Draw tooltip
      if (hoveredNode) {
        const rect = canvas.getBoundingClientRect();
        const x = (hoveredNode.x * zoom + pan.x) + rect.left;
        const y = (hoveredNode.y * zoom + pan.y) + rect.top;
        
        // Tooltip background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(x - 150, y - 80, 300, 60);
        
        // Tooltip text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(hoveredNode.title.substring(0, 40) + '...', x, y - 50);
        
        ctx.font = '10px sans-serif';
        ctx.fillText(hoveredNode.authors, x, y - 30);
        ctx.fillText(`${hoveredNode.citations} citations`, x, y - 15);
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [papers, activePaperId, mode, hoveredNode, zoom, pan, isDragging, clusterPapers, analyzeCitations, applyForceLayout]);

  // Get node color based on mode
  const getNodeColor = (paper, mode) => {
    if (mode === 'clusters') {
      return paper.clusterColor || colorSchemes.clusters.cluster1;
    } else if (mode === 'citations') {
      return colorSchemes.citations[paper.citationLevel] || colorSchemes.citations.low;
    } else {
      return paper.id === activePaperId ? colorSchemes.connections.active : colorSchemes.connections.inactive;
    }
  };

  // Mouse event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMoveEvent = (e) => {
      if (isDragging) {
        handleMouseMove(e);
        return;
      }

      // Check for node hover
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;
      
      // Find hovered node (simplified - would need proper node tracking)
      setHoveredNode(null);
    };

    const handleMouseDownEvent = (e) => handleMouseDown(e);
    const handleMouseUpEvent = () => handleMouseUp();
    const handleWheelEvent = (e) => handleWheel(e);

    canvas.addEventListener('mousedown', handleMouseDownEvent);
    canvas.addEventListener('mousemove', handleMouseMoveEvent);
    canvas.addEventListener('mouseup', handleMouseUpEvent);
    canvas.addEventListener('wheel', handleWheelEvent);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDownEvent);
      canvas.removeEventListener('mousemove', handleMouseMoveEvent);
      canvas.removeEventListener('mouseup', handleMouseUpEvent);
      canvas.removeEventListener('wheel', handleWheelEvent);
    };
  }, [isDragging, pan, zoom, handleMouseDown, handleMouseMove, handleMouseUp, handleWheel]);

  return (
    <div className="w-full h-full relative">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-grab"
        style={{ background: 'transparent' }}
      />
      
      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setZoom(prev => Math.min(3, prev * 1.2))}
          className="bg-slate-800/80 text-white px-3 py-1 rounded text-sm hover:bg-slate-700/80"
        >
          +
        </button>
        <button
          onClick={() => setZoom(prev => Math.max(0.1, prev * 0.8))}
          className="bg-slate-800/80 text-white px-3 py-1 rounded text-sm hover:bg-slate-700/80"
        >
          -
        </button>
        <button
          onClick={() => {
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
          className="bg-slate-800/80 text-white px-3 py-1 rounded text-sm hover:bg-slate-700/80"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ResearchVisualizer;
