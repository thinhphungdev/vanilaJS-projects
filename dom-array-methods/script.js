const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');
const richestBtn = document.getElementById('richest');

// List of user
let data = [];

// INIT
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  try {
    const res = await fetch(`https://randomuser.me/api`);
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
  } catch (error) {
    console.error(error);
  }
}
////////////////////////////////////////////////////
//////////////////// HELPER ////////////////////////
////////////////////////////////////////////////////

function addData(newUser) {
  data.push(newUser);

  updateDOM();
}

function updateDOM(providedData = data) {
  // Clear main Div, delete all the previous child element and insert new ones
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  //1) using appendChild method

  //   providedData.forEach((person) => {
  //     const element = document.createElement('div');
  //     element.classList.add('person');
  //     element.innerHTML = `<strong>${person.name}</strong> ${person.money}`;
  //     main.appendChild(element);
  //   });

  //  2) using insertAdjacentHTML
  providedData.forEach((person) => {
    const personHtml = `<div class="person">
        <strong>${person.name}</strong> ${formatMoney(person.money)}
    </div>`;

    main.insertAdjacentHTML('beforeend', personHtml);
  });
}

function formatMoney(number) {
  return '$' + number?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

////////////////////////////////////////////////////
// Update Logic
////////////////////////////////////////////////////
function doubleMoney(users) {
  data = data.map((user) => {
    return {
      ...user,
      money: user.money * 2,
    };
  });
  updateDOM(data);
}

function showOnlyMillionaires() {
  data = data.filter((user) => user.money >= 1000000);
  updateDOM(data);
}

function sortByRichest() {
  data.sort((a, b) => a.money - b.money);
  updateDOM(data);
}

function calculateEntireWealth() {
  const wealth = data.reduce((acc, cur) => acc + cur.money, 0);

  const weathEl = document.createElement('div');
  weathEl.innerHTML = `<h3>Total Weath: <strong>${formatMoney(
    wealth
  )}</strong> </h3> `;

  main.appendChild(weathEl);
}

function getRichest() {
  const richest = data.reduce((acc, cur) => {
    if (cur?.money > acc) acc = cur.money;
    return acc;
  }, data?.[0].money);

  const richestPerson = data.filter((user) => user.money == richest)?.[0];

  const richestPersonEl = document.createElement('div');
  richestPersonEl.innerHTML = `<h3>The Richest Man: <strong>${
    richestPerson?.name
  } with ${formatMoney(richestPerson?.money)}</strong></h3>`;

  main.appendChild(richestPersonEl);
}

////////////////////////////////////////////////////
// Event Listener
////////////////////////////////////////////////////

function onClickHandlerFactory(element, handlerFn) {
  element.addEventListener('click', handlerFn);
}

onClickHandlerFactory(addUserBtn, getRandomUser);
onClickHandlerFactory(doubleBtn, doubleMoney);
onClickHandlerFactory(showMillionairesBtn, showOnlyMillionaires);
onClickHandlerFactory(sortBtn, sortByRichest);
onClickHandlerFactory(calculateBtn, calculateEntireWealth);
onClickHandlerFactory(richestBtn, getRichest);
