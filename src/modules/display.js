import { listItems, addTask } from './variables.js';
import boxChecked from './completed.js';

// eslint-disable-next-line import/no-mutable-exports
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

export {
  addNewList,
  generateList,
  pushToLocal,
  showList,
  removeList,
  checkCompleted,
};
