import React from 'react';
import { motion } from 'framer-motion';

const StatisticCard = ({ icon, title, value, color }) => {
  const colors = {
    blue: 'from-blue-600/20 to-blue-800/20 border-blue-500/30',
    purple: 'from-purple-600/20 to-purple-800/20 border-purple-500/30',
    green: 'from-green-600/20 to-green-800/20 border-green-500/30',
    pink: 'from-pink-600/20 to-pink-800/20 border-pink-500/30',
  };
  
  const gradientClass = colors[color] || colors.blue;
  
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`bg-gradient-to-br ${gradientClass} p-5 rounded-xl border backdrop-blur-sm`}
    >
      <div className="flex items-center mb-3">
        {icon && <span className="mr-3">{icon}</span>}
        <h3 className="text-gray-300 font-medium">{title}</h3>
      </div>
      
      <div className="text-3xl font-bold text-white">{value}</div>
    </motion.div>
  );
};

export default StatisticCard;
