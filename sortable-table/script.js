const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

// Store list items
const listItems = [];

// const dragStartIndex;

createList();

// Create and Insert List Item to the DOM
function createList() {
  const scrambledList = scrambleList(richestPeople);

  scrambledList.map((person, index) => {
    const listItem = document.createElement('li');
    listItem.setAttribute('data-index', index);
    renderList(listItem, person, index);
  });
}

function scrambleList(list) {
  return list
    .map((value) => ({ value: value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((obj) => obj.value);
}

function renderList(listItem, person, index) {
  listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines">></i>
    </div>
`;

  listItems.push(listItem);

  draggableList.appendChild(listItem);
}
