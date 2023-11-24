const draggables = document.querySelectorAll('.task');
const dropables = document.querySelectorAll('.swim-lane');

draggables.forEach((task) => {
  task.addEventListener('dragstart', () => {
    task.classList.add('is-dragging');
  });

  task.addEventListener('dragend', () => {
    task.classList.remove('is-dragging');
  });
});

dropables.forEach((zone) => {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY);
    const currentTask = document.querySelector('.is-dragging');

    if (bottomTask) {
      zone.insertBefore(currentTask, bottomTask);
    } else {
      zone.appendChild(currentTask);
    }
  });
});

const insertAboveTask = (zone, mouseY) => {
  const notDraggingTasks = zone.querySelectorAll('.task:not(.is-dragging)');

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  notDraggingTasks.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};
