import { motion } from 'framer-motion';
import ErrorMessage from './ErrorMessage';

/**
 * InputForm Component
 * Handles all mortgage calculator inputs with validation
 */
export default function InputForm({ 
  inputs, 
  errors, 
  onChange, 
  onCalculate, 
  onReset 
}) {
  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Loan Amount */}
      <div>
        <label 
          htmlFor="loanAmount" 
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300"
        >
          Loan Amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium transition-colors duration-300">
            $
          </span>
          <input
            id="loanAmount"
            type="number"
            min="0"
            step="1000"
            value={inputs.loanAmount}
            onChange={(e) => handleInputChange('loanAmount', e.target.value)}
            className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
              errors.loanAmount ? 'border-red-500 animate-shake' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="300000"
            aria-invalid={!!errors.loanAmount}
            aria-describedby={errors.loanAmount ? 'loanAmount-error' : undefined}
          />
        </div>
        <ErrorMessage message={errors.loanAmount} />
      </div>

      {/* Down Payment */}
      <div>
        <label 
          htmlFor="downPayment" 
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300"
        >
          Down Payment
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium transition-colors duration-300">
            $
          </span>
          <input
            id="downPayment"
            type="number"
            min="0"
            step="1000"
            value={inputs.downPayment}
            onChange={(e) => handleInputChange('downPayment', e.target.value)}
            className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
              errors.downPayment ? 'border-red-500 animate-shake' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="60000"
            aria-invalid={!!errors.downPayment}
            aria-describedby={errors.downPayment ? 'downPayment-error' : undefined}
          />
        </div>
        <ErrorMessage message={errors.downPayment} />
      </div>

      {/* Interest Rate */}
      <div>
        <label 
          htmlFor="interestRate" 
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300"
        >
          Interest Rate (Annual)
        </label>
        <div className="relative">
          <input
            id="interestRate"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={inputs.interestRate}
            onChange={(e) => handleInputChange('interestRate', e.target.value)}
            className={`w-full pl-4 pr-10 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
              errors.interestRate ? 'border-red-500 animate-shake' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="6.5"
            aria-invalid={!!errors.interestRate}
            aria-describedby={errors.interestRate ? 'interestRate-error' : undefined}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium transition-colors duration-300">
            %
          </span>
        </div>
        <ErrorMessage message={errors.interestRate} />
      </div>

      {/* Loan Term */}
      <div>
        <label 
          htmlFor="loanTerm" 
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300"
        >
          Loan Term
        </label>
        <div className="relative">
          <input
            id="loanTerm"
            type="number"
            min="1"
            max="50"
            step="1"
            value={inputs.loanTerm}
            onChange={(e) => handleInputChange('loanTerm', e.target.value)}
            className={`w-full pl-4 pr-20 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
              errors.loanTerm ? 'border-red-500 animate-shake' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="30"
            aria-invalid={!!errors.loanTerm}
            aria-describedby={errors.loanTerm ? 'loanTerm-error' : undefined}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium transition-colors duration-300">
            years
          </span>
        </div>
        <ErrorMessage message={errors.loanTerm} />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Calculate monthly payment"
        >
          Calculate
        </motion.button>

        <motion.button
          type="button"
          onClick={onReset}
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95, rotate: -5 }}
          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          aria-label="Reset form"
        >
          Reset
        </motion.button>
      </div>
    </form>
  );
}
