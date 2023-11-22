// DOM Selection
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoLane = document.getElementById('todo-lane');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const taskContent = input.value;

  const newTask = createNewTask(taskContent);

  addDragEventHandler(newTask);

  todoLane.appendChild(newTask);

  input.value = '';
});

function createNewTask(taskContent) {
  if (!taskContent) return;

  const newTask = document.createElement('p');
  newTask.classList.add('task');
  newTask.setAttribute('draggable', true);
  newTask.textContent = taskContent;

  return newTask;
}

function addDragEventHandler(element) {
  element.addEventListener('dragstart', () => {
    element.classList.add('is-dragging');
  });

  element.addEventListener('dragend', () => {
    element.classList.remove('is-dragging');
  });
}
