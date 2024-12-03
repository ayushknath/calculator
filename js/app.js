class Calculator {
  constructor(previousOperandDisplay, currentOperandDisplay) {
    this.previousOperandDisplay = previousOperandDisplay;
    this.currentOperandDisplay = currentOperandDisplay;
    this.clear();
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  chooseOperation(operation) {
    if(this.currentOperand === "") return;
    if(this.previousOperand) {
      this.compute();
    }
    this.previousOperand = this.currentOperand;
    this.operation = operation.toString();
    this.currentOperand = "";
  }

  appendNumber(number) {
    if((number === "." && this.currentOperand.toString().includes(".")) || this.currentOperand.toString().length === 10) return;
    this.currentOperand = `${this.currentOperand}${number}`;
  }

  compute() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(curr)) return;
    switch(this.operation) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "×":
        result = prev * curr;
        break;
      case "÷":
        result = prev / curr;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  splitIntegerAndDecimal(number) {
    let integerPart, decimalPart;
    if(number.split('.')[0]) {
      integerPart = number.split('.')[0];
    }
    if(number.split('.')[1]) {
      decimalPart = number.split('.')[1];
    }
    return [integerPart, decimalPart];
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();
    const [integerPart, decimalPart] = this.splitIntegerAndDecimal(stringNumber);
    let displayNumber;
    if(isNaN(integerPart)) {
      displayNumber = "";
    }
    else {
      displayNumber = parseInt(integerPart).toLocaleString("en", { maximumFractionDigits: 0 });
    }
    if(decimalPart !== undefined) {
      displayNumber = `${displayNumber}.${decimalPart}`;
    }
    return displayNumber;
  }

  updateDisplay() {
    this.currentOperandDisplay.textContent = this.formatDisplayNumber(this.currentOperand);
    if(this.operation !== undefined) {
      this.previousOperandDisplay.textContent = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation}`;
    }
    else {
      this.previousOperandDisplay.textContent = "";
    }
  }
}

const numberButtons = Array.from(document.querySelectorAll("[data-number]"));
const operationButtons = Array.from(document.querySelectorAll("[data-operation]"));
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandDisplay = document.querySelector("[data-previous-display]");
const currentOperandDisplay = document.querySelector("[data-current-display]");

const calculator = new Calculator(previousOperandDisplay, currentOperandDisplay);

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.textContent);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((operationButton) => {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.textContent);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});