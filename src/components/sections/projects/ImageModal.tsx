'use client';

import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  error?: string | null;
}

export default function ImageModal({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  error = null,
}: ImageModalProps) {
  if (images.length === 0) return null;

  const imageUrl = images[currentIndex];

  useEffect(() => {
    // Ya no se bloquea el scroll
    // Esto previene que el scroll se "rompa" al cerrar el modal
  }, []);

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="modal-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <div className="fixed inset-0 z-[100000] overflow-auto flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative my-8 mx-auto max-w-[90vw] max-h-[80vh] overflow-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Anterior */}
            <button
              onClick={onPrev}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Imagen anterior"
            >
              ‹
            </button>

            {/* Imagen */}
            <img
              src={imageUrl}
              alt={`Imagen ${currentIndex + 1}`}
              className="block max-w-full max-h-full object-contain"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            />

            {/* Botón Siguiente */}
            <button
              onClick={onNext}
              disabled={currentIndex === images.length - 1}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Imagen siguiente"
            >
              ›
            </button>

            {/* Botón Cerrar */}
            <button
              onClick={onClose}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2 -mr-2 -mt-2 hover:bg-red-600 transition-colors"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            {/* Debug error */}
            {error && (
              <div className="absolute -top-8 left-0 bg-blue-600 text-white px-2 py-1 text-xs rounded">
                {imageUrl}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
