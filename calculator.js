const buttons = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");
const operateButton = document.getElementById("equals-btn");
const clearAllButton = document.getElementById("clear-all-btn");
const deleteButton = document.getElementById("backspace-btn");
const periodButton = document.getElementById("period");
const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const OPERATORS = ["+", "-", "*", "/"];
let firstNum,
  secondNum,
  currentOperator,
  previousOperator,
  displayValue = "";

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 == 0) {
    alert("Division by 0 is prohibited!");
    return 
  } else {
    return num1 / num2;
  }
}

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function operate(operator, number1, number2) {
  switch (operator) {
    case "+":
      return add(number1, number2);
    case "-":
      return subtract(number1, number2);
    case "*":
      return multiply(number1, number2);
    case "/":
      return divide(number1, number2);
    default:
      alert("Enter a valid operand");
  }
}

function updateDisplay(newValue) {
  document.getElementById("result").value = newValue;
  displayValue = document.getElementById("result").value;
}

function clearAll() {
  updateDisplay("");
  currentOperator = "";
  firstNum = null;
  secondNum = null;
  previousOperator = null;
  Array.prototype.forEach.call(operators, (o) => {
    o.classList.remove("current-operator");
  });
  periodButton.disabled = false;
}

function backSpace() {
  let updatedDisplayValue = displayValue.substring(0, displayValue.length - 1);
  if (!updatedDisplayValue.includes(".")) {
    periodButton.disabled = false;
  }
  updateDisplay(updatedDisplayValue);
  if (document.getElementById("result").value === "") {
    clearAll();
  }
}

function handleOperators(operatorValue, op) {
  periodButton.disabled = false;
  op.classList.add("current-operator");
  Array.prototype.forEach.call(operators, (o) => {
    if (o.value !== op.value) {
      o.classList.remove("current-operator");
    }
  });
  if (firstNum && firstNum !== "-") {
    if (!displayValue) {
      previousOperator = currentOperator;
      currentOperator = operatorValue;
      if (previousOperator && currentOperator === "-") {
        secondNum = "-";
      }
      return;
    } else {
      if (secondNum === "-") {
        secondNum = parseFloat(displayValue) * -1;
      } else {
        secondNum = parseFloat(displayValue);
        let result = operate(currentOperator, firstNum, secondNum);
        if (result % 1 !== 0) {
          let roundedResult = roundToTwo(result);
          updateDisplay(roundedResult);
          firstNum = roundedResult;
        } else {
          firstNum = result;
          updateDisplay(result);
        }
        currentOperator = operatorValue;
        displayValue = "";
      }
    }
  } else if (firstNum == null && displayValue === "") {
    if (operatorValue === "-") {
      firstNum = operatorValue;
    }
  } else if (firstNum && displayValue !== "") {
    if (firstNum === "-") {
      firstNum = parseFloat(displayValue) * -1;
      currentOperator = operatorValue;
      displayValue = "";
    }
  } else if (firstNum == null && displayValue !== "") {
    firstNum = parseFloat(displayValue);
    currentOperator = operatorValue;
    displayValue = "";
  }
}

function handleOperands() {
  let currentOp = document.querySelector(`input[value="${currentOperator}"]`);
  currentOp.classList.remove("current-operator");
  if (periodButton.disabled) {
    periodButton.disabled = false;
  }
  if (firstNum !== null) {
    if (!displayValue) {
      return;
    } else {
      secondNum = parseFloat(displayValue);
      let result = operate(currentOperator, firstNum, secondNum);
      if (result % 1 !== 0) {
        let roundedResult = roundToTwo(result);
        updateDisplay(roundedResult);
        firstNum = roundedResult;
      } else {
        updateDisplay(result);
        firstNum = result;
      }
      displayValue = "";
    }
  }
}

function handlePeriod(dot) {
  displayValue += dot;
  updateDisplay(displayValue);
  periodButton.disabled = true;
}

function handleKeyboardInput(event) {
  let name = event.key;
  if (NUMBERS.includes(name)) {
    displayValue += name;
    updateDisplay(displayValue);
  } else if (OPERATORS.includes(name)) {
    let currentOp = document.querySelector(`input[value="${name}"]`);
    handleOperators(name, currentOp);
  } else if (name === "Enter") {
    handleOperands();
  } else if (name === "Backspace") {
    backSpace();
  } else if (name === ".") {
    if (displayValue.includes(name)) {
      return false;
    } else {
      handlePeriod(name);
    }
  }
}

Array.prototype.forEach.call(buttons, (button) => {
  button.addEventListener("click", function () {
    displayValue += button.value;
    updateDisplay(displayValue);
    Array.prototype.forEach.call(operators, (operator) => {
      if (operator.classList.contains("current-operator")) {
        operator.classList.remove("current-operator");
      }
    });
  });
});
Array.prototype.forEach.call(operators, (operator) => {
  operator.addEventListener("click", function () {
    handleOperators(operator.value, operator);
  });
});
operateButton.addEventListener("click", handleOperands);
clearAllButton.addEventListener("click", clearAll);
deleteButton.addEventListener("click", backSpace);
periodButton.addEventListener("click", function () {
  handlePeriod(periodButton.value);
});
document.addEventListener("keydown", handleKeyboardInput);
