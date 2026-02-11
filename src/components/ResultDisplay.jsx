import { motion, AnimatePresence } from 'framer-motion';

/**
 * ResultDisplay Component
 * Shows mortgage calculation results with smooth animations
 */
export default function ResultDisplay({ result }) {
  if (!result) return null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-8 shadow-lg border border-blue-100 dark:border-gray-600 transition-colors duration-300"
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
          className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center transition-colors duration-300">
            Over {result.loanTerm || 'the loan term'}, you'll pay{' '}
            <span className="font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">
              {formatCurrency(result.totalInterest)}
            </span>{' '}
            in interest
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
