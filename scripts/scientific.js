class ScientificCalculator extends Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    super(previousOperandTextElement, currentOperandTextElement);
  }

  scientificFunction(func) {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;

    let computation;
    switch (func) {
      case "sin":
        computation = Math.sin(current);
        break;
      case "cos":
        computation = Math.cos(current);
        break;
      case "tan":
        computation = Math.tan(current);
        break;
      case "log":
        computation = Math.log10(current);
        break;
      case "ln":
        computation = Math.log(current);
        break;
      case "√":
        computation = Math.sqrt(current);
        break;
      case "x^y":
        this.operation = "^";
        this.previousOperand = this.currentOperand;
        this.currentOperand = "0";
        return;
      case "x^2":
        computation = Math.pow(current, 2);
        break;
      case "x^3":
        computation = Math.pow(current, 3);
        break;
      case "10^x":
        computation = Math.pow(10, current);
        break;
      case "e^x":
        computation = Math.exp(current);
        break;
      case "π":
        computation = Math.PI;
        break;
      case "e":
        computation = Math.E;
        break;
      case "!":
        computation = this.factorial(current);
        break;
      case "%":
        // Calculate percentage of the previous operand if available
        if (this.previousOperand && this.operation) {
          const prev = parseFloat(this.previousOperand);
          computation = (prev * current) / 100;
          this.previousOperand = "";
          this.operation = undefined;
        } else {
          // If no previous operand, just divide by 100
          computation = current / 100;
        }
        break;
      default:
        return;
    }

    this.currentOperand = computation.toString();
    this.resetScreen = true;
    this.updateDisplay();
  }

  factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  compute() {
    if (this.operation === "^") {
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);

      if (isNaN(prev) || isNaN(current)) return;

      this.currentOperand = Math.pow(prev, current).toString();
      this.operation = undefined;
      this.previousOperand = "";
      this.resetScreen = true;
    } else {
      super.compute();
    }
  }
}
