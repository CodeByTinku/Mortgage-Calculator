import { motion } from 'framer-motion';

/**
 * ErrorMessage Component
 * Displays error messages with a shake animation when they appear
 */
export default function ErrorMessage({ message }) {
  if (!message) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="text-red-500 text-sm mt-1 flex items-center gap-1"
    >
      <svg 
        className="w-4 h-4" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          fillRule="evenodd" 
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
          clipRule="evenodd" 
        />
      </svg>
      <span>{message}</span>
    </motion.div>
  );
}
