export const listItems = document.querySelector('.task-list');
export const addTask = document.querySelector('#new-task');
export const addBtn = document.getElementById('plus');

export let taskArr = [];

const addNewList = () => {
  const task = {};
  task.index = taskArr.length + 1;
  task.description = addTask.value;
  task.completed = false;
  taskArr.push(task);
};

// Save To Local Directory

const pushToLocal = () => {
  localStorage.setItem('taskArr', JSON.stringify(taskArr));
};

// To render the task list

const generateList = () => {
  taskArr.forEach((task) => {
    listItems.innerHTML += `
        <li class="task" >
          <div class='item' >
          <input data-action="checkbox" type="Checkbox" id='1' data-id="${task.index}" />
          <p class="description">"${task.description}"</p>
          </div class='item'>
          
          <div id="edit" class="hide">
         <i class="fa-solid fa-ellipsis-vertical"></i>
          </div>
         
          <i data-action="delete" class="fa-regular fa-trash-can" id="removeBtn"></i>
         
        </li>`;
    addTask.value = '';
  });
};

const showList = () => {
  if (localStorage.getItem('taskArr')) {
    taskArr = JSON.parse(localStorage.getItem('taskArr'));
  }
  generateList();
};

// Delete Button to remove task

const removeList = (index) => {
  taskArr.splice(index, 1);
  addNewList();
  generateList();
  pushToLocal();
};

// Completed task list

const checkCompleted = (buttonId, box) => {
  box.nextElementSibling.classList.toggle('mark-completed');
  taskArr[buttonId].completed = boxChecked(box);
  pushToLocal(taskArr);
  if (taskArr[buttonId].completed === true) {
    box.checked = true;
    box.nextElementSibling.classList.add('mark-completed');
  }
};

// on Load

window.addEventListener('load', () => {
  showList();
});

addTask.addEventListener('keypress', (e) => {
  const { target } = e;
  if (target.value === '') return;
  if (e.key === 'Enter') {
    addNewList();
  }
});

// Add Button to add new task

addBtn.addEventListener('click', () => {
  addNewList();
  generateList();
  pushToLocal();
});

// delete Button to remove task

listItems.addEventListener('click', (e) => {
  const { target } = e;
  const parentElement = target.parentNode;
  if (!parentElement.classList.contains('task')) return;
  const eachListId = Number(parentElement.id);
  // target the data action
  const { action } = target.dataset;

  if (action === 'delete') {
    removeList(eachListId);
  }
});

// Highlight Completed task

listItems.addEventListener('change', (e) => {
  const { target } = e;
  const parentElement = target.parentNode;
  if (!parentElement.classList.contains('item')) return;
  const eachListId = Number(parentElement.id);
  // target the data action
  const { action } = target.dataset;

  if (action === 'checkbox') {
    checkCompleted(eachListId, target);
    boxChecked(target);
  }
});

//complete
const boxChecked = (box) => {
  if (box.checked) {
    return true;
  }
  return false;
};
export default boxChecked;

//remove all completed
const removeAllCompleted = () => {
  const newTasks = taskArr.filter((taskArr) => !taskArr.completed);
  for (let i = 0; i < newTasks.length; i += 1) {
    newTasks[i].index = i + 1;
  }
  taskArr.length = 0;
  newTasks.forEach((newTask) => taskArr.push(newTask));
};

// Clear completed tasks
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
  removeAllCompleted();
  addNewList();
  generateList();
  pushToLocal();
});
