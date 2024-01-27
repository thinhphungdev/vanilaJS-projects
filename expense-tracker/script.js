const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Salary', amount: 300 },
//   { id: 2, text: 'Book', amount: -30 },
//   { id: 3, text: 'Camera', amount: -150 },
// ];

const storagedTransaction = JSON.parse(localStorage.getItem('transactions'));

let transactions = storagedTransaction ? storagedTransaction : [];

// Init App
function init() {
  list.innerHTML = '';
  transactions.forEach((transaction) => addTransactionToDOM2(transaction));

  updateValues();
}

init();

// Add transaction to DOM list
function addTransactionToDOM(transaction) {
  // get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  // Add class CSS based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button onclick="removeTransaction(${
      transaction.id
    })" class="delete-btn">X</button>
  `;

  list.appendChild(item);
}

function addTransactionToDOM2(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const transactionItemHtml = `
    <li class=${transaction.amount < 0 ? 'minus' : 'plus'}>
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button onclick="removeTransaction(${
    transaction.id
  })" class="delete-btn">X</button>
    </li>
    `;

  list.insertAdjacentHTML('beforeend', transactionItemHtml);
}

// Update the Balance, income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts
    .reduce((acc, transaction) => acc + transaction, 0)
    .toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -(1).toFixed(2);

  balance.innerText = `${total}`;
  money_plus.innerText = `${income}`;
  money_minus.innerText = `${expense}`;
}

function generateRandomTransactionID() {
  return Math.floor(Math.random() * 1000000);
}

// Add and Delete transctions;
function addTransaction(event) {
  event.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    return alert('Please add a text and amount');
  }

  const transaction = {
    amount: +amount.value,
    id: generateRandomTransactionID(),
    text: text.value,
  };

  transactions.push(transaction);

  addTransactionToDOM(transaction);
  updateValues();
  updateLocalStorage();

  text.value = '';
  amount.value = '';
}

function removeTransaction(transactionId) {
  transactions = transactions.filter(
    (transaction) => transaction.id !== transactionId
  );
  updateLocalStorage();
  init();
}

form.addEventListener('submit', addTransaction);

// Update data in local storage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
