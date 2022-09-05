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
  } else {
    return num1 / num2;
  }
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

function clearAll(){
    updateDisplay("");
    numbers = [];
    currentOperator = "";
    firstNum = 0;
    secondNum = 0;
}

function backSpace(){
    let updatedDisplayValue = displayValue.substring(0, displayValue.length - 1);
    updateDisplay(updatedDisplayValue);
}

let buttons = document.getElementsByClassName("number");
let operators = document.getElementsByClassName("operator");
const operateButton = document.getElementById("equals-btn");
const clearAllButton = document.getElementById("clear-all-btn");
const deleteButton = document.getElementById("backspace-btn");
const EXPRESSIONS = /\+|\*|\-|\//;
let firstNum,
    secondNum,
  currentOperator,
  currentResult,
  displayValue = "",
  numbers =[];

Array.prototype.forEach.call(buttons, (button) => {
  button.addEventListener("click", function () {
    displayValue += button.value;
    updateDisplay(displayValue);
  });
});

Array.prototype.forEach.call(operators, (operator) => {
  operator.addEventListener("click", function () {
    if (firstNum){
      secondNum = parseFloat(displayValue);
      let result = operate(currentOperator, firstNum, secondNum);
      firstNum = result;
      updateDisplay(result);
      currentOperator = operator.value;
      displayValue = "";
    } else {
      firstNum = parseFloat(displayValue);
      currentOperator = operator.value;
      displayValue = "";
    }
  });
});

operateButton.addEventListener("click", function (){
  if (firstNum) {
    if(!secondNum){
      secondNum = parseFloat(displayValue);
      let result = operate(currentOperator, firstNum, secondNum);
      updateDisplay(result);
      firstNum = displayValue;
    } else {
      let result = operate(currentOperator, firstNum, secondNum);
      updateDisplay(result);
      firstNum = displayValue;
    }
  }
});

if (clearAllButton){
    clearAllButton.addEventListener("click", clearAll);
}

if (deleteButton){
    deleteButton.addEventListener("click", backSpace);
}

