# 🏠 Mortgage Calculator

A beautiful, responsive mortgage calculator built with **React**, **TailwindCSS**, and **Framer Motion**. Calculate monthly mortgage payments with smooth animations and a modern, clean interface.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18-FF0080?style=for-the-badge&logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

- ✅ **Accurate Calculations** - Uses the standard mortgage formula: `M = P[r(1+r)^n]/[(1+r)^n-1]`
- ✅ **Comprehensive Inputs** - Loan amount, down payment, interest rate, and loan term
- ✅ **Smart Validation** - Prevents invalid inputs (negative values, down payment > loan amount, etc.)
- ✅ **Smooth Animations** - Powered by Framer Motion for delightful transitions
- ✅ **Responsive Design** - Works beautifully on mobile, tablet, and desktop
- ✅ **Accessibility** - Full keyboard navigation, ARIA labels, and focus states
- ✅ **Modern UI** - Clean card-based layout with gradient backgrounds and shadows
- ✅ **Playful Interactions** - Reset button with rotation animation, shake effects on errors
- ✅ **Dark Mode** - Fully responsive dark mode with persistent theme preference
- ✅ **Export to PDF** - Download your mortgage summary as a professional PDF document

## 🚀 Tech Stack

- **React 18** - Component-based UI library
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready animation library
- **JavaScript (ES6+)** - Modern JavaScript features

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Clone the repository** (or navigate to the project directory)
   ```bash
   cd Mortgage-Calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

## 🎯 Usage

1. **Enter Loan Details:**
   - **Loan Amount**: The total amount you want to borrow (e.g., $300,000)
   - **Down Payment**: The upfront payment amount (e.g., $60,000)
   - **Interest Rate**: Annual interest rate percentage (e.g., 6.5%)
   - **Loan Term**: Number of years for the loan (e.g., 30 years)

2. **Click Calculate** to see your results:
   - Monthly Payment
   - Principal Amount (Loan - Down Payment)
   - Total Payment over the loan term
   - Total Interest paid

3. **Click Reset** to clear all fields and start over

## 🧮 Mortgage Formula Explained

The calculator uses the standard amortization formula:

```
Monthly Payment = P × [r(1+r)^n] / [(1+r)^n - 1]

Where:
  P = Principal (Loan Amount - Down Payment)
  r = Monthly Interest Rate (Annual Rate / 12 / 100)
  n = Total Number of Payments (Years × 12)
```

**Special Case:** If the interest rate is 0%, the calculator uses simple division: `P / n`

### Example Calculation

For a **$300,000 loan** with a **$60,000 down payment** at **6.5% interest** for **30 years**:

- Principal: $240,000
- Monthly Payment: ~$1,517.50
- Total Payment: ~$546,300
- Total Interest: ~$306,300

## 📁 Project Structure

```
Mortgage-Calculator/
├── src/
│   ├── components/
│   │   ├── InputForm.jsx        # Input fields with validation
│   │   ├── ResultDisplay.jsx    # Animated results display
│   │   └── ErrorMessage.jsx     # Reusable error component
│   ├── utils/
│   │   └── calculator.js        # Calculation & validation logic
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # React entry point
│   └── index.css                # TailwindCSS imports & styles
├── index.html                   # HTML template
├── tailwind.config.js           # TailwindCSS configuration
├── package.json                 # Dependencies & scripts
└── README.md                    # This file
```


## ⚠️ Error Handling

The calculator validates:
- ✅ All fields are required and non-empty
- ✅ No negative values allowed
- ✅ Down payment cannot exceed loan amount
- ✅ Interest rate must be between 0-100%
- ✅ Loan term must be positive

Errors are displayed with:
- Red border on invalid inputs
- Shake animation for attention
- Clear error messages below each field


## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔮 Future Enhancements

- [ ] Add payment schedule visualization
- [x] Export results as PDF
- [ ] Compare multiple loan scenarios
- [ ] Save calculations to local storage
- [ ] Add property tax and insurance calculations

## 🙌 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

---

**Built with ❤️ using React, TailwindCSS, and Framer Motion**
