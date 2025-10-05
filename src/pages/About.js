import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaDatabase, FaSearchengin, FaUsers } from 'react-icons/fa';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
          About NASA Bioscience Explorer
        </h1>
        <p className="text-xl text-gray-300">
          Exploring the frontiers of space biology research to enable human exploration of the Moon and Mars
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="bg-slate-800/50 border border-indigo-800/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4 flex items-center">
            <FaRocket className="mr-3" /> Our Mission
          </h2>
          <p className="text-gray-300 mb-4">
            NASA Bioscience Explorer aims to make NASA's extensive bioscience research accessible and actionable. 
            Our platform organizes and summarizes research on how humans, plants, and other living systems respond 
            to the space environment, enabling scientists, managers, and mission architects to leverage this vital 
            knowledge for future space exploration.
          </p>
          <p className="text-gray-300">
            By leveraging artificial intelligence and advanced visualization techniques, we transform complex 
            scientific publications into digestible insights that accelerate discovery and innovation in space biology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/30 border border-indigo-800/20 rounded-xl p-5">
            <div className="bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <FaDatabase className="text-blue-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">608+ Publications</h3>
            <p className="text-gray-400">
              Access and explore hundreds of NASA-funded bioscience research papers in one place.
            </p>
          </div>

          <div className="bg-slate-800/30 border border-indigo-800/20 rounded-xl p-5">
            <div className="bg-indigo-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <FaSearchengin className="text-indigo-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered</h3>
            <p className="text-gray-400">
              Intelligent search and summarization helps you quickly find relevant information.
            </p>
          </div>

          <div className="bg-slate-800/30 border border-indigo-800/20 rounded-xl p-5">
            <div className="bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <FaUsers className="text-purple-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Collaborative</h3>
            <p className="text-gray-400">
              Designed for scientists, managers, and mission architects to share knowledge.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-indigo-800/30 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Data Sources</h2>
          <p className="text-gray-300 mb-4">
            The NASA Bioscience Explorer integrates data from multiple NASA resources:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>NASA Biological and Physical Sciences Division research publications</li>
            <li>NASA Open Science Data Repository (OSDR)</li>
            <li>NASA Space Life Sciences Library</li>
            <li>NASA Task Book</li>
          </ul>
          
          <div className="mt-6 pt-6 border-t border-indigo-800/30">
            <p className="text-gray-400 text-sm">
              This platform was created as part of NASA's initiative to make space biology research more accessible and actionable.
              For questions or feedback, please contact us at <a href="mailto:contact@example.com" className="text-blue-400 hover:text-blue-300">contact@example.com</a>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
