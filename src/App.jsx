import { useState } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            🏠 Mortgage Calculator
          </h1>
          <p className="text-gray-600 text-lg">
            Calculate your monthly mortgage payments with ease
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-10"
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
          className="text-center mt-8 text-gray-600 text-sm"
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
