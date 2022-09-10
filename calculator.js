/*          RETRIEVING DOM ELEMENTS FOR MANIPULATION          */
const buttons = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");
const operateButton = document.getElementById("equals-btn");
const clearAllButton = document.getElementById("clear-all-btn");
const deleteButton = document.getElementById("backspace-btn");
const periodButton = document.getElementById("period");
/*          ARRAY OF SINGLE-DIGIT POSITIVE INTEGERS            */
const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
/*          ARRAY OF BASIC MATHEMATICAL OPERATORS            */
const OPERATORS = ["+", "-", "*", "/"];
/*          DECLARATION OF VARIABLES TO BE USED                */
let firstNum,
  secondNum,
  currentOperator,
  previousOperator,
  displayValue = "";

/**
 *
 * @param {First number in the mathematical operation} num1
 * @param {Second number in the mathematical operation} num2
 * @returns The sum of the first and the second number.
 */
function add(num1, num2) {
  return num1 + num2;
}

/**
 *
 * @param {First number in the mathematical operation} num1
 * @param {Second number in the mathematical operation} num2
 * @returns The difference of the first and the second number.
 */
function subtract(num1, num2) {
  return num1 - num2;
}

/**
 *
 * @param {First number in the mathematical operation} num1
 * @param {Second number in the mathematical operation} num2
 * @returns The product of the first and the second number.
 */
function multiply(num1, num2) {
  return num1 * num2;
}

/**
 *
 * @param {First number in the mathematical operation} num1
 * @param {Second number in the mathematical operation} num2
 * @returns The quotient of the first number divided by the second number.
 */
function divide(num1, num2) {
  if (num2 == 0) {
    alert("Division by 0 is prohibited!");
    return;
  } else {
    return num1 / num2;
  }
}

/**
 *
 * @param {A decimal number} num
 * @returns The decimal number corrected to 2 decimal places
 */
function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

/**
 *
 * @param {The mathematical operation to be carried out on number1 and number 2} operator
 * @param {Operand in the mathematical operation} number1
 * @param {Operand in the mathematical operation} number2
 * @returns The result of the mathematical operation on the two numbers
 */
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

/**
 *
 * @param {Value to be added to the display of the calculator} newValue
 */
function updateDisplay(newValue) {
  document.getElementById("result").value = newValue;
  displayValue = document.getElementById("result").value;
}

/**
 * This function resets all the variables and the display of the calculator to their
 * initial state
 */
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

/**
 * This function removes the last number of any dislayed number when called
 */
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

/**
 *
 * @param {The mathematical operation that is intended to be used} operatorValue
 * @param {The DOM element that was clicked/pressed which indicated the mathematical operation to be used } op
 */
function handleOperators(operatorValue, op) {
  periodButton.disabled = false;
  op.classList.add("current-operator");
  Array.prototype.forEach.call(operators, (o) => {
    if (o.value !== op.value) {
      o.classList.remove("current-operator");
    }
  });
  if (firstNum && firstNum !== "-") {
    if (displayValue === "") {
      previousOperator = currentOperator;
      currentOperator = operatorValue;
      if (previousOperator !== null && currentOperator === "-") {
        secondNum = "-";
        currentOperator = previousOperator;
      } else {
        currentOperator = operatorValue;
      }
    } else {
      if (secondNum === "-") {
        secondNum = parseFloat(displayValue) * -1;
      } else {
        secondNum = parseFloat(displayValue);
      }
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

/**
 * This function when called, operates on the 2 existing numbers in memory using the specified
 * mathematical operator then updates the display of the calculator with the result.
 */
function handleOperands() {
  let currentOp = document.querySelector(`input[value="${currentOperator}"]`);
  currentOp.classList.remove("current-operator");
  if (periodButton.disabled) {
    periodButton.disabled = false;
  }
  if (firstNum !== null && firstNum !== "-") {
    if (!displayValue) {
      updateDisplay(firstNum);
      displayValue = "";
    } else {
      if (secondNum === "-") {
        secondNum = parseFloat(displayValue) * -1;
      } else {
        secondNum = parseFloat(displayValue);
      }
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
  } else if (firstNum === "-" && displayValue !== "") {
    firstNum = parseFloat(displayValue) * -1;
    updateDisplay(firstNum);
    displayValue = "";
  }
}

/**
 *
 * @param {The period character} dot
 * This function updates the calculator's display with a period
 */
function handlePeriod(dot) {
  displayValue += dot;
  updateDisplay(displayValue);
  periodButton.disabled = true;
}

/**
 *
 * @param {The DOM keydown event} event
 * @returns false if current display value already contains a period.
 */
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

/*          ADDING EVENT LISTENERS TO THE APPROPRIATE BUTTONS AND KEYBOARD KEYS          */
Array.prototype.forEach.call(buttons, (button) => {
  // NUMBER BUTTONS
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

// MATHEMATICAL OPERATOR BUTTONS
Array.prototype.forEach.call(operators, (operator) => {
  operator.addEventListener("click", function () {
    handleOperators(operator.value, operator);
  });
});
operateButton.addEventListener("click", handleOperands); // EQUALS BUTTON
clearAllButton.addEventListener("click", clearAll); // CLEAR BUTTON
deleteButton.addEventListener("click", backSpace); // DELETE BUTTON
// PERIOD BUTTON
periodButton.addEventListener("click", function () {
  handlePeriod(periodButton.value);
});
document.addEventListener("keydown", handleKeyboardInput); // KEYBOARD EVENTS
