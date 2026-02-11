import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import { validateInputs, calculateMonthlyPayment } from './utils/calculator';
import './index.css';

function App() {
  const [inputs, setInputs] = useState({
    loanAmount: '',
    downPayment: '',
    interestRate: '',
    loanTerm: ''
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Save dark mode preference and apply to document
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCalculate = () => {
    // Validate inputs
    const validation = validateInputs(
      inputs.loanAmount,
      inputs.downPayment,
      inputs.interestRate,
      inputs.loanTerm
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    // Calculate mortgage
    const calculationResult = calculateMonthlyPayment(
      inputs.loanAmount,
      inputs.downPayment,
      inputs.interestRate,
      inputs.loanTerm
    );

    // Add loan term to result for display purposes
    calculationResult.loanTerm = inputs.loanTerm;

    setResult(calculationResult);
    setErrors({});
  };

  const handleReset = () => {
    setInputs({
      loanAmount: '',
      downPayment: '',
      interestRate: '',
      loanTerm: ''
    });
    setErrors({});
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        {/* Dark Mode Toggle */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 text-gray-800 dark:text-yellow-300 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Toggle dark mode"
        >
          <span className="text-2xl">
            {darkMode ? '☀️' : '🌙'}
          </span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-3 transition-colors duration-300">
            🏠 Mortgage Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg transition-colors duration-300">
            Calculate your monthly mortgage payments with ease
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-10 transition-colors duration-300"
        >
          <InputForm
            inputs={inputs}
            errors={errors}
            onChange={handleInputChange}
            onCalculate={handleCalculate}
            onReset={handleReset}
          />

          <ResultDisplay result={result} />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-8 text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300"
        >
          <p>
            Built with React, TailwindCSS, and Framer Motion
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
