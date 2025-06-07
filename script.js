const display = document.getElementById('display');
const historyList = document.getElementById('history');
let currentInput = '';
let resultDisplayed = false;
let history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];

function appendNumber(number) {
    if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
    }
    if (currentInput === '0') currentInput = '';
    currentInput += number;
    updateDisplay();
}

function appendOperator(operator) {
    if (currentInput === '') return;
    if (/[+\-*/%]$/.test(currentInput)) {
        currentInput = currentInput.slice(0, -1) + operator;
    } else {
        currentInput += operator;
    }
    updateDisplay();
    resultDisplayed = false;
}

function appendDot() {
    let lastNumber = currentInput.split(/[+\-*/%]/).pop();
    if (!lastNumber.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function clearDisplay() {
    currentInput = '';
    updateDisplay();
}

function deleteLast() {
    if (resultDisplayed) {
        clearDisplay();
        resultDisplayed = false;
        return;
    }
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    try {
        let expression = currentInput.replace(/÷/g, '/').replace(/×/g, '*');
        let evalResult = eval(expression);
        display.textContent = evalResult !== undefined ? evalResult : '';
        // Only add to history if input is not empty and result is not error
        if (currentInput && !isNaN(evalResult)) {
            addToHistory(currentInput, evalResult);
        }
        currentInput = evalResult.toString();
        resultDisplayed = true;
    } catch {
        display.textContent = 'Error';
        resultDisplayed = true;
    }
}

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function addToHistory(expression, result) {
    // Keep most recent 10 history entries
    history.unshift({ expression, result });
    if (history.length > 10) history.pop();
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.expression} = ${item.result}`;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    history = [];
    localStorage.removeItem('calculatorHistory');
    renderHistory();
}

// Render history on page load
renderHistory();