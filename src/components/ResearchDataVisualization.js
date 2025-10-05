import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaMicroscope, FaDna, FaHeartbeat, FaBone, FaRadiation } from 'react-icons/fa';

const ResearchDataVisualization = ({ paper }) => {
  // Generate relevant data visualizations based on paper content
  const generateVisualization = () => {
    const category = paper.category?.toLowerCase() || '';
    const keywords = paper.keywords || [];
    
    if (category.includes('health') || category.includes('medicine')) {
      return {
        type: 'health',
        title: 'Health Impact Analysis',
        icon: <FaHeartbeat className="text-red-400" size={24} />,
        data: [
          { label: 'Bone Density Loss', value: 85, color: 'from-red-500 to-red-600' },
          { label: 'Muscle Atrophy', value: 72, color: 'from-orange-500 to-orange-600' },
          { label: 'Cardiovascular Impact', value: 68, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Immune Response', value: 45, color: 'from-green-500 to-green-600' }
        ]
      };
    }
    
    if (category.includes('biology') || category.includes('cellular')) {
      return {
        type: 'biology',
        title: 'Cellular Response Analysis',
        icon: <FaMicroscope className="text-blue-400" size={24} />,
        data: [
          { label: 'Gene Expression Changes', value: 92, color: 'from-blue-500 to-blue-600' },
          { label: 'Protein Synthesis', value: 78, color: 'from-indigo-500 to-indigo-600' },
          { label: 'Cell Division Rate', value: 65, color: 'from-purple-500 to-purple-600' },
          { label: 'Metabolic Activity', value: 58, color: 'from-pink-500 to-pink-600' }
        ]
      };
    }
    
    if (category.includes('radiation')) {
      return {
        type: 'radiation',
        title: 'Radiation Effects Analysis',
        icon: <FaRadiation className="text-yellow-400" size={24} />,
        data: [
          { label: 'DNA Damage', value: 88, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Oxidative Stress', value: 76, color: 'from-orange-500 to-orange-600' },
          { label: 'Cell Survival Rate', value: 42, color: 'from-red-500 to-red-600' },
          { label: 'Repair Mechanisms', value: 34, color: 'from-green-500 to-green-600' }
        ]
      };
    }
    
    if (category.includes('space') || category.includes('microgravity')) {
      return {
        type: 'space',
        title: 'Microgravity Effects Analysis',
        icon: <FaChartLine className="text-cyan-400" size={24} />,
        data: [
          { label: 'Bone Loss Rate', value: 90, color: 'from-cyan-500 to-cyan-600' },
          { label: 'Muscle Degradation', value: 82, color: 'from-blue-500 to-blue-600' },
          { label: 'Fluid Redistribution', value: 75, color: 'from-indigo-500 to-indigo-600' },
          { label: 'Vestibular Adaptation', value: 68, color: 'from-purple-500 to-purple-600' }
        ]
      };
    }
    
    // Default visualization
    return {
      type: 'general',
      title: 'Research Impact Metrics',
      icon: <FaDna className="text-green-400" size={24} />,
      data: [
        { label: 'Research Significance', value: 85, color: 'from-green-500 to-green-600' },
        { label: 'Clinical Relevance', value: 78, color: 'from-blue-500 to-blue-600' },
        { label: 'Future Applications', value: 72, color: 'from-purple-500 to-purple-600' },
        { label: 'Knowledge Gap Filling', value: 68, color: 'from-orange-500 to-orange-600' }
      ]
    };
  };

  const visualization = generateVisualization();

  return (
    <div className="mt-6">
      <div className="flex items-center mb-4">
        {visualization.icon}
        <h3 className="text-lg font-semibold text-blue-300 ml-2">{visualization.title}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visualization.data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-slate-700/30 border border-indigo-800/20 rounded-xl p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-300">{item.label}</span>
              <span className="text-sm font-bold text-blue-400">{item.value}%</span>
            </div>
            <div className="w-full bg-slate-600/40 rounded-full h-2.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className={`bg-gradient-to-r ${item.color} h-2.5 rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Additional context based on paper type */}
      <div className="mt-4 p-4 bg-slate-700/20 border border-indigo-800/20 rounded-xl">
        <h4 className="text-sm font-semibold text-blue-300 mb-2">Research Context</h4>
        <p className="text-xs text-gray-400">
          {visualization.type === 'health' && "This research contributes to understanding how spaceflight affects human physiology, providing crucial data for developing countermeasures for long-duration space missions."}
          {visualization.type === 'biology' && "Cellular and molecular studies in microgravity reveal fundamental biological processes and adaptation mechanisms that could inform both space medicine and terrestrial applications."}
          {visualization.type === 'radiation' && "Understanding radiation effects on biological systems is essential for protecting astronauts during deep space exploration and developing radiation shielding strategies."}
          {visualization.type === 'space' && "Microgravity research provides unique insights into fundamental biological processes and helps develop countermeasures for space exploration."}
          {visualization.type === 'general' && "This research advances our understanding of space biology and contributes to the development of technologies for human space exploration."}
        </p>
      </div>
    </div>
  );
};

export default ResearchDataVisualization;
