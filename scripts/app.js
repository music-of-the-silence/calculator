document.addEventListener("DOMContentLoaded", () => {
  const calculator = document.querySelector(".calculator");
  const previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
  );
  const currentOperandTextElement = document.querySelector(
    "[data-current-operand]"
  );
  const numberButtons = document.querySelectorAll("[data-number]");
  const operationButtons = document.querySelectorAll("[data-operation]");
  const equalsButton = document.querySelector("[data-equals]");
  const deleteButton = document.querySelector("[data-delete]");
  const allClearButton = document.querySelector("[data-all-clear]");
  const scientificButtons = document.querySelectorAll("[data-scientific]");
  const toggleScientificButton = document.querySelector(
    "[data-toggle-scientific]"
  );
  const scientificButtonsContainer = document.querySelector(
    ".scientific-buttons"
  );

  const calc = new ScientificCalculator(
    previousOperandTextElement,
    currentOperandTextElement
  );

  // Toggle scientific mode
  toggleScientificButton.addEventListener("click", () => {
    calculator.classList.toggle("scientific-mode");
    scientificButtonsContainer.classList.toggle("hidden");
    const titleElement = document.querySelector("[data-calculator-title]");

    if (calculator.classList.contains("scientific-mode")) {
      toggleScientificButton.textContent = "Basic Mode";
      titleElement.textContent = "Scientific Calculator";
      // Load scientific CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "styles/scientific.css";
      document.head.appendChild(link);
    } else {
      toggleScientificButton.textContent = "Scientific Mode";
      titleElement.textContent = "Basic Calculator";
      // Remove scientific CSS
      const links = document.querySelectorAll(
        'link[href="styles/scientific.css"]'
      );
      links.forEach((link) => link.remove());
    }
  });

  // Number buttons
  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calc.appendNumber(button.innerText);
      calc.updateDisplay();
    });
  });

  // Operation buttons
  operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calc.chooseOperation(button.innerText);
      calc.updateDisplay();
    });
  });

  // Equals button
  equalsButton.addEventListener("click", () => {
    calc.compute();
    calc.updateDisplay();
  });

  // All clear button
  allClearButton.addEventListener("click", () => {
    calc.clear();
    calc.updateDisplay();
  });

  // Delete button
  deleteButton.addEventListener("click", () => {
    calc.delete();
    calc.updateDisplay();
  });

  // Scientific buttons
  scientificButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calc.scientificFunction(button.innerText);
      calc.updateDisplay();
    });
  });

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
      calc.appendNumber(e.key);
      calc.updateDisplay();
    } else if (e.key === ".") {
      calc.appendNumber(e.key);
      calc.updateDisplay();
    } else if (
      e.key === "+" ||
      e.key === "-" ||
      e.key === "*" ||
      e.key === "/"
    ) {
      calc.chooseOperation(e.key === "/" ? "÷" : e.key);
      calc.updateDisplay();
    } else if (e.key === "Enter" || e.key === "=") {
      calc.compute();
      calc.updateDisplay();
    } else if (e.key === "Backspace") {
      calc.delete();
      calc.updateDisplay();
    } else if (e.key === "Escape") {
      calc.clear();
      calc.updateDisplay();
    }
  });
});
