const dashboard = document.getElementById('dashboard');
const deposit = document.getElementById('deposit');
const withdraw = document.getElementById('withdraw');
const balance = document.getElementById('balance');
const debt = document.getElementById('debt');
const depositInput = document.getElementById('deposit-input');
const withdrawInput = document.getElementById('withdraw-input');
const balanceInput = document.getElementById('set-balance-input');
const debtInput = document.getElementById('debt-input');
const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');
const setBalanceBtn = document.getElementById('set-balance-btn');
const debtBtn = document.getElementById('debt-btn');
var localBalance = parseFloat(localStorage.getItem('balance')) || 0;
var localDebt = parseFloat(localStorage.getItem('debt')) || 0;
const noDebt = document.getElementById('no-debt');
const incomeInput = document.getElementById('income');
const incomeBtn = document.getElementById('income-btn');
const depositNote = document.getElementById('deposit-note');
const withdrawNote = document.getElementById('withdraw-note');
const debtNote = document.getElementById('debt-note');

balance.textContent = localBalance.toFixed(2);
debt.textContent = localDebt.toFixed(2);

depositBtn.addEventListener('click', () => {
    const value = depositInput.value;
    const depositValue = Number(value);
    const balanceValue = Number(balance.innerText) + Number(value);
    deposit.innerText = depositValue;
    balance.innerText = balanceValue;
    const note = depositNote.value;
    addTransaction('deposit', value, note);
    localBalance += parseFloat(value);
    localStorage.setItem('balance', localBalance);
    localBalance = parseFloat(localStorage.getItem('balance')) || 0;
    balance.textContent = localBalance.toFixed(2);
})

withdrawBtn.addEventListener('click', () => {
    const value = withdrawInput.value;
    const withdrawValue = Number(value);
    const balanceValue = Number(balance.innerText) - Number(value);
    withdraw.innerText = withdrawValue;
    balance.innerText = balanceValue;
    addTransaction('withdrawal', value, withdrawNote.value);
    localBalance -= parseFloat(value);
    localStorage.setItem('balance', localBalance);
    localBalance = parseFloat(localStorage.getItem('balance')) || 0;
    balance.textContent = localBalance.toFixed(2);
})

setBalanceBtn.addEventListener('click', () => {
    const value = balanceInput.value;
    balance.innerText = value;
    localBalance = parseFloat(value);
    localStorage.setItem('balance', localBalance);
    localBalance = parseFloat(localStorage.getItem('balance')) || 0;
    balance.textContent = localBalance.toFixed(2);
})

debtBtn.addEventListener('click', () => {
    const value = debtInput.value;
    const debtValue = Number(debt.innerText) + Number(value);
    debt.innerText = debtValue;
    addTransaction('debt', value, debtNote.value);
    localDebt += parseFloat(value);
    localStorage.setItem('debt', localDebt);
    localDebt = parseFloat(localStorage.getItem('debt')) || 0;
    debt.textContent = localDebt.toFixed(2);
})

incomeBtn.addEventListener('click', () => {
    const income = incomeInput.value;
    const currBalance = Number(balance.innerText);
    const currDebt = Number(debt.innerText);
    const days = noDebtCalculator(income, currBalance, currDebt);
    noDebt.innerText = days;
})

window.onload = function() {
    displayTransactions();
}

function addTransaction(type, amount, note) {
    var transaction = {
        type: type,
        amount: amount,
        note: note,
        timestamp: new Date().toLocaleString()
    };

    var transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    transactions.push(transaction);

    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function displayTransactions() {
    var transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    var transactionsContainer = document.getElementById('transactions-container');
    var numCols = 3

    transactionsContainer.style.columnCount = numCols;

    var startIndex = Math.max(transactions.length - 12, 0);
    for (var i = startIndex; i < transactions.length; i++) {
        var transaction = transactions[i];

        var transactionElement = document.createElement('div');
        transactionElement.className = 'transaction';
        transactionElement.innerHTML = `
            <p>Type: ${transaction.type}</p>
            <p>Amount: ${transaction.amount}</p>
            <p>Note: ${transaction.note}<p>
            <p>Timestamp: ${transaction.timestamp}</p>
        `;

        // Append transaction element to the container
        transactionsContainer.appendChild(transactionElement);
    }
}

function noDebtCalculator(income, balance, debt) {
    remainder = debt - balance;
    days = remainder / income;
    if (days < 0) {
        return 0
    }
    return days;
}