import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = memo(({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const nextImage = useCallback((e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback((e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative aspect-video cursor-pointer overflow-hidden border-2 border-transparent hover:border-primary rounded-lg transition-colors duration-300 will-change-transform gpu-accelerated outline-none focus-visible:border-primary w-full p-0"
            onClick={() => openLightbox(index)}
            aria-label={`View full image ${index + 1}`}
          >
            <img 
              src={img} 
              alt={`Gallery screenshot ${index + 1}`} 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/0 hover:bg-primary/20 transition-colors duration-300" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <div className="absolute top-4 right-4 z-[110]">
              <button 
                onClick={closeLightbox}
                className="p-3 text-white/70 hover:text-primary transition-colors bg-black/50 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close gallery"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="absolute top-4 left-4 z-[110] text-white/70 font-rajdhani font-bold text-xl tracking-wider bg-black/50 px-4 py-2 rounded-full">
              {currentIndex + 1} OF {images.length}
            </div>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] p-4 text-white/70 hover:text-primary hover:scale-110 transition-transform bg-black/50 rounded-full will-change-transform min-w-[56px] min-h-[56px] flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] p-4 text-white/70 hover:text-primary hover:scale-110 transition-transform bg-black/50 rounded-full will-change-transform min-w-[56px] min-h-[56px] flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-6xl max-h-[90vh] px-16 flex items-center justify-center pointer-events-none will-change-transform gpu-accelerated"
            >
              <img
                src={images[currentIndex]}
                alt={`Screenshot ${currentIndex + 1}`}
                loading="lazy"
                decoding="async"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-[0_0_50px_rgba(255,23,68,0.2)] border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

ImageGallery.displayName = 'ImageGallery';
export default ImageGallery;