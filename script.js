const OPERATORS = ['plus', 'minus', 'multiply', 'div'];
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const FUNCTIONS = ['c', 'ce', '='];
const SYMBOLS = ['.'];

function sum(n1, n2) {
  return n1 + n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  if (n2 === 0) {
    alert('Error! Failure!');
    return n1;
  }

  return n1 / n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function removeLastChar(text) {
  return text.substring(0, text.length - 1);
}

function operate(operator, n1, n2) {
  let res = '0';
  switch (operator) {
    case OPERATORS[0]:
      res = sum(n1, n2);
      break;
    case OPERATORS[1]:
      res = subtract(n1, n2);
      break;
    case OPERATORS[2]:
      res = multiply(n1, n2);
      break;
    case OPERATORS[3]:
      res = divide(n1, n2);
      break;
    default:
      break;
  }
  return Number(res.toFixed(2));
}

function initCalc() {
  const main = document.getElementById('main');
  const screen = document.querySelector('.screen');
  screen.textContent = '0';
  let result = '0';
  let lastInput = '';
  let operator = null;

  main.addEventListener('click', (e) => {
    if (e.target?.id  === e.currentTarget.id) return;
    
    const value = e.target.id;

    if (!isNaN(value)) {
      // !operator = first input
      lastInput += value;
      screen.textContent = lastInput;
    } else {
      switch (value) {
        case 'c':
          lastInput && (lastInput = removeLastChar(lastInput));
          screen.textContent = lastInput || '0';
          break;
        case 'ce':
          lastInput = '';
          operator = null;
          result = '0';
          screen.textContent = '0';
          break;
        case 'eq':
          if (operator && lastInput) {
            result = operate(
              operator,
              Number(result),
              Number(lastInput),
            ).toString();
            screen.textContent = result;
            lastInput = '';
          }
          break;
        case '.':
          if (!lastInput.includes('.')) lastInput += value;
          screen.textContent = lastInput;
          break;
        default:
          if (lastInput && operator && result != '0') {
            result = operate(operator, +result, +lastInput).toString();
            screen.textContent = result;
            operator = value;
          } else {
            operator = value;
            result == '0' && (result = lastInput);
            lastInput = '';
          }
          break;
      }
    }
  });
}

initCalc();
