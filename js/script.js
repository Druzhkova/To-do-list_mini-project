let inputTask = document.querySelector('.input-task');
let inputData = document.querySelector('.input-data');
let popup = document.querySelector('.modal__clear-all');
let tasksTextToDo = document.querySelector('#tasks-to-do');
let tasksInProgress = document.querySelector('#tasks-in-progress');
let tasksDone = document.querySelector('#tasks-done');
let modalEmptyFields = document.querySelector('.modal__empty-fields')
let buttonClearAllToDo = document.querySelector('#clear-all-to-do');
let buttonClearAllDone = document.querySelector('#button-done-list');
let buttonAddTask = document.querySelector('.to-do-list-header__button');
let buttonDeleteInProgressList = document.querySelector('#button-in-progress-list');
let buttonCloseModals = document.querySelector('.modals__button-no');
let buttonClosemodalEmptyFields = document.querySelector('.button-close-modal-empty-fields');
let modalMaxElements = document.querySelector('.modal__max-elements');
let deleteModalInProgress = document.querySelector('.modal__delete-task-in-progress');

window.addEventListener('click', function(event){
  if(event.target === popup) {
    popup.style.display = 'none';
  }
});

inputTask.addEventListener('focus', function(){
  inputTask.placeholder = "";
})

inputTask.addEventListener('blur', function(){
  if(inputTask.value === "")
  inputTask.placeholder = 'enter new task';
})

buttonAddTask.addEventListener('click', function(){
  if(inputTask.value && inputData.value && inputTask.value.trim().length > 0){
    createElements(`${inputData.value} ${inputTask.value} `);
    clearFields();
  } else {
    modalEmptyFields.style.display = 'block';
    buttonClosemodalEmptyFields.addEventListener('click', function(){
      modalEmptyFields.style.display = 'none';
    })
  }
})

function clearFields(){
  inputData.value = '';
  inputTask.value = '';
}

function createElements(text){
  let divTask = document.createElement('li');
  divTask.textContent = text;
  createElement(divTask, 'task', 'task', tasksTextToDo);

  let divTaskIcons = document.createElement('span');
  createElement(divTaskIcons, 'task__icons-to-do', 'task__icons', divTask);

  let taskIconRightArrow = document.createElement('span');
  createElement(taskIconRightArrow, 'task__icon', 'task__right-arrow', divTaskIcons);

  let taskIconCross = document.createElement('span');
  createElement(taskIconCross, 'task__icon', 'task__cross', divTaskIcons);
  createTaskNumber()

  taskIconCross.addEventListener('click', removeTask);
  divTask.addEventListener('click', moveTasks);
}

function createElement(element, id, className, addTo){
  element.id = id;
  element.classList.add(className);
  addTo.append(element);
}

function moveTasks(event){
  if(event.target.className === 'task__right-arrow'){
    moveTasksToInProgress();
  } else if(event.target.className === 'task__right-arrow-in-progress'){
    tasksDone.append(event.currentTarget);
    changeClassList('task__right-arrow-in-progress', 'task__right-arrow-done');
    createTaskNumber();

  } else if(event.target.className === 'task__right-arrow-done'){
    tasksTextToDo.append(event.currentTarget);
    changeClassList('task__right-arrow-done', 'task__right-arrow');
    createTaskNumber();
  }
}

function changeClassList(initual, ensuing){
  event.target.classList.remove(initual);
  event.target.classList.add(ensuing);
}

function moveTasksToInProgress() {
  if(tasksInProgress.children.length === 5){
    modalMaxElements.style.display = 'block';
  } else {
    tasksInProgress.append(event.currentTarget);
    changeClassList('task__right-arrow', 'task__right-arrow-in-progress');
    createTaskNumber();
  }
}

document.querySelector('.modals__button-yes-max').addEventListener('click', function(){
  modalMaxElements.style.display = 'none';
})

function removeTask(event){
  if(event.target.previousSibling.className === 'task__right-arrow' || event.target.previousSibling.className === 'task__right-arrow-done') {
    event.target.parentNode.parentNode.remove();
    createTaskNumber(); 
  } else if(event.target.previousSibling.className === 'task__right-arrow-in-progress'){
    deleteModalInProgress.style.display = 'block';
  }

  document.querySelector('.modals__button-yes-delete-task').addEventListener('click', function(){
    deleteModalInProgress.style.display = 'none';
    event.target.parentNode.parentNode.remove();
    createTaskNumber();
  });
  
  document.querySelector('.modals__button-no-delete-task').addEventListener('click', function(){
    deleteModalInProgress.style.display = 'none';
  })

}

buttonClearAllToDo.addEventListener('click', function(){
  if(tasksTextToDo.children.length > 0) {
    tasksTextToDo.innerHTML = '';
    createTaskNumber();
  } 
})

buttonClearAllDone.addEventListener('click', function(){
  if(tasksDone.children.length > 0) {
    tasksDone.innerHTML = '';
    createTaskNumber()
  } 
})

buttonDeleteInProgressList.addEventListener('click', function(){
  if(tasksInProgress.children.length > 0) {
    popup.style.display = 'block';
  } 
});

buttonCloseModals.addEventListener('click', function(){
  popup.style.display = 'none';
});

document.querySelector('.modals__button-yes').addEventListener('click', function(){
  popup.style.display = 'none';
  tasksInProgress.innerHTML = '';
  createTaskNumber();
});

function createTaskNumber() { 
  let titles = document.querySelectorAll('.title');
  for (let item of titles) {
    if(item.id === 'title-to-do'){
      if(tasksTextToDo.children.length === 0) {
        item.textContent = 'to do:';
      } else {
        item.textContent = `you have ${tasksTextToDo.children.length} todos:`;;
      }
    } else if(item.id === 'title-in-progress') {
      if(tasksInProgress.children.length === 0) {
        item.textContent = 'in progress:';
      } else {
        item.textContent = `${tasksInProgress.children.length} in progress:`;
      }
    } else if(item.id === 'title-done') {
      if(tasksDone.children.length === 0) {
        item.textContent = 'done:';
      } else {
        item.textContent = `${tasksDone.children.length} done:`;
      }
    }
  }
}
