// DOM Selection
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoLane = document.getElementById('todo-lane');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskContent = input.value;
  if (!taskContent) return;

  const task = document.createElement('p');
  task.classList.add('task');
  task.setAttribute('draggable', true);
  task.textContent = taskContent;

  input.value = '';

  todoLane.appendChild(task);
});
