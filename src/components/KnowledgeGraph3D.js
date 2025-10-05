import React, { useRef, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3D Node Component
const Node3D = ({ position, paper, isActive, onClick, onHover, color, size }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      
      // Pulsing effect for active node
      if (isActive) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
      }
    }
  });

  const handleClick = useCallback(() => {
    onClick(paper);
  }, [onClick, paper]);

  const handlePointerOver = useCallback(() => {
    setHovered(true);
    onHover(paper);
  }, [onHover, paper]);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={hovered ? 1.2 : 1}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhongMaterial
          color={color}
          emissive={isActive ? color : new THREE.Color(0x000000)}
          emissiveIntensity={isActive ? 0.3 : 0}
          shininess={100}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Node label */}
      <Text
        position={[0, size + 0.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        {paper.title.length > 30 ? paper.title.substring(0, 30) + '...' : paper.title}
      </Text>
      
      {/* Citation count */}
      <Text
        position={[0, size + 1, 0]}
        fontSize={0.2}
        color="#60a5fa"
        anchorX="center"
        anchorY="middle"
      >
        {paper.citations} citations
      </Text>
    </group>
  );
};

// 3D Connection Component
const Connection3D = ({ start, end, strength }) => {
  const ref = useRef();
  
  useFrame(() => {
    if (ref.current) {
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2 + (Math.random() - 0.5) * 2,
        (start[1] + end[1]) / 2 + (Math.random() - 0.5) * 2,
        (start[2] + end[2]) / 2 + (Math.random() - 0.5) * 2
      ),
      new THREE.Vector3(...end)
    ]);
    
    return curve.getPoints(50);
  }, [start, end]);

  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#60a5fa"
        opacity={strength}
        transparent
        linewidth={2}
      />
    </line>
  );
};

// Cluster Component
const Cluster3D = ({ papers, center, color, label }) => {
  const positions = useMemo(() => {
    return papers.map((paper, index) => {
      const angle = (index / papers.length) * Math.PI * 2;
      const radius = 2 + Math.random() * 2;
      const height = (Math.random() - 0.5) * 3;
      
      return [
        center[0] + Math.cos(angle) * radius,
        center[1] + height,
        center[2] + Math.sin(angle) * radius
      ];
    });
  }, [papers, center]);

  return (
    <group>
      {/* Cluster label */}
      <Text
        position={[center[0], center[1] + 4, center[2]]}
        fontSize={0.5}
        color={color}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {label}
      </Text>
      
      {/* Cluster papers */}
      {papers.map((paper, index) => (
        <Node3D
          key={paper.id}
          position={positions[index]}
          paper={paper}
          color={color}
          size={0.3 + (paper.citations / 100) * 0.5}
          onClick={() => {}}
          onHover={() => {}}
        />
      ))}
    </group>
  );
};

// Main 3D Knowledge Graph Component
const KnowledgeGraph3D = ({ papers, mode = 'connections', onNodeClick, onNodeHover }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Categorize papers
  const categorizedPapers = useMemo(() => {
    const categories = {};
    papers.forEach(paper => {
      if (!categories[paper.category]) {
        categories[paper.category] = [];
      }
      categories[paper.category].push(paper);
    });
    return categories;
  }, [papers]);

  // Generate cluster positions
  const clusterPositions = useMemo(() => {
    const positions = {};
    const categories = Object.keys(categorizedPapers);
    const radius = 8;
    
    categories.forEach((category, index) => {
      const angle = (index / categories.length) * Math.PI * 2;
      positions[category] = [
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ];
    });
    
    return positions;
  }, [categorizedPapers]);

  // Generate connections between related papers
  const connections = useMemo(() => {
    if (mode !== 'connections') return [];
    
    const conns = [];
    papers.forEach((paper, i) => {
      if (paper.relatedPapers) {
        paper.relatedPapers.forEach(relatedPaper => {
          const relatedIndex = papers.findIndex(p => p.id === relatedPaper.id);
          if (relatedIndex !== -1) {
            const startPos = [
              Math.cos((i / papers.length) * Math.PI * 2) * 6,
              (Math.random() - 0.5) * 4,
              Math.sin((i / papers.length) * Math.PI * 2) * 6
            ];
            const endPos = [
              Math.cos((relatedIndex / papers.length) * Math.PI * 2) * 6,
              (Math.random() - 0.5) * 4,
              Math.sin((relatedIndex / papers.length) * Math.PI * 2) * 6
            ];
            
            conns.push({
              start: startPos,
              end: endPos,
              strength: 0.3 + Math.random() * 0.4
            });
          }
        });
      }
    });
    
    return conns;
  }, [papers, mode]);

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

  const handleNodeClick = useCallback((paper) => {
    setSelectedNode(paper);
    if (onNodeClick) onNodeClick(paper);
  }, [onNodeClick]);

  const handleNodeHover = useCallback((paper) => {
    setHoveredNode(paper);
    if (onNodeHover) onNodeHover(paper);
  }, [onNodeHover]);

  return (
    <div className="w-full h-full bg-slate-900">
      <Canvas
        camera={{ position: [0, 5, 15], fov: 60 }}
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
        />
        
        {/* Render based on mode */}
        {mode === 'clusters' ? (
          // Cluster mode
          Object.entries(categorizedPapers).map(([category, categoryPapers]) => (
            <Cluster3D
              key={category}
              papers={categoryPapers}
              center={clusterPositions[category]}
              color={categoryColors[category] || '#60a5fa'}
              label={category}
            />
          ))
        ) : mode === 'citations' ? (
          // Citation network mode
          papers.map((paper, index) => {
            const angle = (index / papers.length) * Math.PI * 2;
            const radius = 4 + (paper.citations / 50) * 4;
            const position = [
              Math.cos(angle) * radius,
              (Math.random() - 0.5) * 6,
              Math.sin(angle) * radius
            ];
            
            return (
              <Node3D
                key={paper.id}
                position={position}
                paper={paper}
                color={categoryColors[paper.category] || '#60a5fa'}
                size={0.2 + (paper.citations / 100) * 0.8}
                isActive={selectedNode?.id === paper.id}
                onClick={handleNodeClick}
                onHover={handleNodeHover}
              />
            );
          })
        ) : (
          // Connections mode
          <>
            {papers.map((paper, index) => {
              const angle = (index / papers.length) * Math.PI * 2;
              const position = [
                Math.cos(angle) * 6,
                (Math.random() - 0.5) * 4,
                Math.sin(angle) * 6
              ];
              
              return (
                <Node3D
                  key={paper.id}
                  position={position}
                  paper={paper}
                  color={categoryColors[paper.category] || '#60a5fa'}
                  size={0.3 + (paper.citations / 100) * 0.5}
                  isActive={selectedNode?.id === paper.id}
                  onClick={handleNodeClick}
                  onHover={handleNodeHover}
                />
              );
            })}
            
            {/* Connections */}
            {connections.map((conn, index) => (
              <Connection3D
                key={index}
                start={conn.start}
                end={conn.end}
                strength={conn.strength}
              />
            ))}
          </>
        )}
        
        {/* Hovered node info */}
        {hoveredNode && (
          <Html position={[0, 8, 0]} center>
            <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg p-4 max-w-sm">
              <h3 className="text-white font-semibold mb-2">{hoveredNode.title}</h3>
              <p className="text-gray-300 text-sm mb-2">{hoveredNode.category}</p>
              <p className="text-blue-400 text-sm">{hoveredNode.citations} citations</p>
            </div>
          </Html>
        )}
      </Canvas>
    </div>
  );
};

export default KnowledgeGraph3D;
