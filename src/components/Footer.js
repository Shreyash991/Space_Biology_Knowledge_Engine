import React from 'react';
import { FaGithub, FaTwitter, FaInstagram, FaRocket } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-indigo-800/30 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <FaRocket className="text-nasa-red mr-2" />
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">NASA Bioscience Explorer</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Explore NASA's bioscience research to support human space exploration to the Moon and Mars.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Resources</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="https://www.nasa.gov/biological-physical/" className="hover:text-white transition">NASA Biological & Physical Sciences</a></li>
              <li><a href="https://osdr.nasa.gov/" className="hover:text-white transition">NASA Open Science Data Repository</a></li>
              <li><a href="https://taskbook.nasaprs.com/" className="hover:text-white transition">NASA Task Book</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-indigo-800/30 flex flex-col md:flex-row justify-between text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} NASA Bioscience Explorer</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
