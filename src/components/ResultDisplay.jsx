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
        className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border border-blue-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Your Mortgage Summary
        </h2>

        <div className="space-y-4">
          {/* Monthly Payment - Most Important */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-500"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Monthly Payment</span>
              <span className="text-3xl font-bold text-blue-600">
                {formatCurrency(result.monthlyPayment)}
              </span>
            </div>
          </motion.div>

          {/* Other Details */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="bg-white rounded-lg p-4 shadow-md space-y-3"
          >
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Principal Amount</span>
              <span className="text-lg font-semibold text-gray-800">
                {formatCurrency(result.principal)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Payment</span>
              <span className="text-lg font-semibold text-gray-800">
                {formatCurrency(result.totalPayment)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Total Interest</span>
              <span className="text-lg font-semibold text-green-600">
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
          className="mt-6 pt-6 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 text-center">
            Over {result.loanTerm || 'the loan term'}, you'll pay{' '}
            <span className="font-semibold text-gray-700">
              {formatCurrency(result.totalInterest)}
            </span>{' '}
            in interest
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
