const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');

let data = [];
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

function addData(newUser) {
  data.push(newUser);
}
