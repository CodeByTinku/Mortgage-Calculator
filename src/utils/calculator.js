/**
 * Validates mortgage calculator inputs
 * @returns {Object} Validation result with isValid flag and errors object
 */
export const validateInputs = (loanAmount, downPayment, interestRate, loanTermYears) => {
  const errors = {};
  
  // Check for empty fields
  if (!loanAmount || loanAmount <= 0) {
    errors.loanAmount = 'Loan amount must be greater than 0';
  }
  
  if (downPayment === '' || downPayment < 0) {
    errors.downPayment = 'Down payment cannot be negative';
  }
  
  if (!interestRate || interestRate < 0) {
    errors.interestRate = 'Interest rate must be 0 or greater';
  }
  
  if (interestRate > 100) {
    errors.interestRate = 'Interest rate cannot exceed 100%';
  }
  
  if (!loanTermYears || loanTermYears <= 0) {
    errors.loanTerm = 'Loan term must be greater than 0';
  }
  
  // Check if down payment exceeds loan amount
  if (parseFloat(downPayment) > parseFloat(loanAmount)) {
    errors.downPayment = 'Down payment cannot exceed loan amount';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Calculates monthly mortgage payment using standard mortgage formula
 * Formula: M = P[r(1+r)^n]/[(1+r)^n-1]
 * where:
 *   M = Monthly payment
 *   P = Principal (loan amount - down payment)
 *   r = Monthly interest rate (annual rate / 12 / 100)
 *   n = Number of months (years * 12)
 * 
 * Special case: If interest rate is 0%, uses simple division: P / n
 */
export const calculateMonthlyPayment = (loanAmount, downPayment, interestRate, loanTermYears) => {
  const principal = parseFloat(loanAmount) - parseFloat(downPayment || 0);
  const months = parseFloat(loanTermYears) * 12;
  
  // Special case: 0% interest rate
  if (parseFloat(interestRate) === 0) {
    const monthlyPayment = principal / months;
    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: principal.toFixed(2),
      totalInterest: '0.00',
      principal: principal.toFixed(2)
    };
  }
  
  // Standard mortgage calculation
  const monthlyRate = parseFloat(interestRate) / 100 / 12;
  const monthlyPayment = 
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
    (Math.pow(1 + monthlyRate, months) - 1);
  
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;
  
  return {
    monthlyPayment: monthlyPayment.toFixed(2),
    totalPayment: totalPayment.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    principal: principal.toFixed(2)
  };
};
