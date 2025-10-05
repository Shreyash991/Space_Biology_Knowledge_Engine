import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaImage } from 'react-icons/fa';

const ImageGallery = ({ images, title = "Research Images" }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState(new Set());

  if (!images || images.length === 0) {
    return null;
  }

  const openModal = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center mb-4">
        <FaImage className="text-blue-400 mr-2" />
        <h3 className="text-lg font-semibold text-blue-300">{title}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.slice(0, 4).map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative group cursor-pointer"
            onClick={() => openModal(index)}
          >
            <div className="relative overflow-hidden rounded-lg bg-slate-700/30 border border-indigo-800/20">
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  setImageErrors(prev => new Set([...prev, index]));
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
                onLoad={() => {
                  setImageErrors(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(index);
                    return newSet;
                  });
                }}
              />
              
              {/* Fallback for broken images */}
              <div 
                className={`w-full h-48 bg-gradient-to-br from-slate-700/50 to-indigo-800/30 flex items-center justify-center text-gray-400 ${
                  imageErrors.has(index) ? 'flex' : 'hidden'
                }`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-600/30 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <FaImage className="text-2xl text-indigo-400" />
                  </div>
                  <p className="text-sm font-medium">Research Figure</p>
                  <p className="text-xs text-gray-500 mt-1">Click to view details</p>
                </div>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <FaExpand className="text-white text-xl" />
              </div>
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-white text-sm font-medium">{image.caption}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-slate-800 rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
              >
                <FaTimes />
              </button>

              {/* Navigation buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}

              {/* Image */}
              <div className="relative">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="max-w-full max-h-[70vh] object-contain mx-auto"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                
                {/* Fallback for broken images */}
                <div 
                  className="hidden w-full h-96 bg-slate-700/50 flex items-center justify-center text-gray-400"
                  style={{ display: 'none' }}
                >
                  <div className="text-center">
                    <FaImage className="mx-auto mb-4 text-4xl" />
                    <p className="text-lg">Image unavailable</p>
                    <p className="text-sm mt-2">This image could not be loaded</p>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 bg-slate-700/50">
                <p className="text-white font-medium">{selectedImage.caption}</p>
                <p className="text-gray-400 text-sm mt-1">
                  Image {currentIndex + 1} of {images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;
