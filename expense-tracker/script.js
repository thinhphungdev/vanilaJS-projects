const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'Salary', amount: 300 },
  { id: 2, text: 'Book', amount: -30 },
  { id: 3, text: 'Camera', amount: -150 },
];

let transactions = dummyTransactions;

// Add transaction to DOM list
function addTransactionDOM(transaction) {
  // get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  // Add class CSS based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn">X</button>
  `;

  list.appendChild(item);
}

function addTransactionDOM2(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const transactionItemHtml = `
    <li class=${transaction.amount < 0 ? 'minus' : 'plus'}>
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn">x</button>
    </li>
    `;

  list.insertAdjacentHTML('beforeend', transactionItemHtml);
}

// Init App
function init() {
  list.innerHTML = '';
  transactions.forEach((transaction) => addTransactionDOM2(transaction));
}

init();
