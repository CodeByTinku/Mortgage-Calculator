import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * ResultDisplay Component
 * Shows mortgage calculation results with smooth animations
 */
export default function ResultDisplay({ result }) {
  const resultRef = useRef(null);

  if (!result) return null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const generatePDF = async () => {
    if (!resultRef.current) return;

    try {
      const element = resultRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        backgroundColor: null, // Use element's background
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add image to PDF, centering vertically if possible or just at top
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`Mortgage_Summary.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={resultRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-8 shadow-lg border border-blue-100 dark:border-gray-600 transition-colors duration-300 relative"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center transition-colors duration-300">
          Your Mortgage Summary
        </h2>

        <div className="space-y-4">
          {/* Monthly Payment - Most Important */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md border-l-4 border-blue-500 transition-colors duration-300"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300 font-medium transition-colors duration-300">Monthly Payment</span>
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
                {formatCurrency(result.monthlyPayment)}
              </span>
            </div>
          </motion.div>

          {/* Other Details */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md space-y-3 transition-colors duration-300"
          >
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
              <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Principal Amount</span>
              <span className="text-lg font-semibold text-gray-800 dark:text-white transition-colors duration-300">
                {formatCurrency(result.principal)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
              <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Total Payment</span>
              <span className="text-lg font-semibold text-gray-800 dark:text-white transition-colors duration-300">
                {formatCurrency(result.totalPayment)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Total Interest</span>
              <span className="text-lg font-semibold text-green-600 dark:text-green-400 transition-colors duration-300">
                {formatCurrency(result.totalInterest)}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Visual breakdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600 pb-16" // Added pb-16 to make space for button inside container if needed, or simply let flow
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center transition-colors duration-300">
            Over {result.loanTerm || 'the loan term'}, you'll pay{' '}
            <span className="font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">
              {formatCurrency(result.totalInterest)}
            </span>{' '}
            in interest
          </p>
        </motion.div>

        {/* Export Button - Placed absolutely or at bottom */}
        <div className="flex justify-center mt-6" data-html2canvas-ignore>
           <button
            onClick={generatePDF}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all transform hover:scale-105"
          >
            <span>📜</span> Export as PDF
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
