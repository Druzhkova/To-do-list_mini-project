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
    inputData.value = '';
    inputTask.value = '';
  } else {
    modalEmptyFields.style.display = 'block';
    let buttonClosemodalEmptyFields = document.querySelector('.button-close-modal-empty-fields');
    buttonClosemodalEmptyFields.addEventListener('click', function(){
      modalEmptyFields.style.display = 'none';
    })
  }
})

function createTaskNumber() { 
  let titles = document.querySelectorAll('.title');
    for (let item of titles) {
    if(item.id === 'title-to-do'){
      if(tasksTextToDo.children.length === 0) {
        item.textContent = 'to do:';
      } else {
        item.textContent = `you have ${tasksTextToDo.children.length} todos:`
      }
    } else if(item.id === 'title-in-progress') {
      if(tasksInProgress.children.length === 0) {
        item.textContent = 'in progress:';
      } else {
        item.textContent = `${tasksInProgress.children.length} in progress:`
      }
    } else if(item.id === 'title-done') {
      if(tasksDone.children.length === 0) {
        item.textContent = 'done:';
      } else {
        item.textContent = `${tasksDone.children.length} done:`
      }
    }
  }
}

function createElements(text){
  let divTask = document.createElement('li');
  divTask.id = 'task';
  divTask.textContent = text;
  tasksTextToDo.append(divTask);

  let divTaskIcons = document.createElement('span');
  divTaskIcons.id = 'task__icons-to-do';
  divTaskIcons.classList.add('task__icons');
  divTask.append(divTaskIcons);

  let taskIconRightArrow = document.createElement('span');
  taskIconRightArrow.id = 'task__icon';
  taskIconRightArrow.classList.add('task__right-arrow');
  divTaskIcons.append(taskIconRightArrow);

  let taskIconCross = document.createElement('span');
  taskIconCross.id = 'task__icon';
  taskIconCross.classList.add('task__cross');
  divTaskIcons.append(taskIconCross);

  createTaskNumber()

  taskIconCross.addEventListener('click', removeTask);

  function removeTask(event){
    if(event.target.previousSibling.className === 'task__right-arrow' || event.target.previousSibling.className === 'task__right-arrow-done') {
      divTask.remove();
      createTaskNumber()   
    } else if(event.target.previousSibling.className === 'task__right-arrow-in-progress'){
      deleteModalInProgress.style.display = 'block';
      createTaskNumber()
    }

    document.querySelector('.modals__button-yes-delete-task').addEventListener('click', function(){
      deleteModalInProgress.style.display = 'none';
      divTask.remove(); 
      createTaskNumber()
    });
    
    document.querySelector('.modals__button-no-delete-task').addEventListener('click', function(){
      deleteModalInProgress.style.display = 'none';
      createTaskNumber()
    })
  }
  
  divTask.addEventListener('click', function(event){
    if(event.target.className === 'task__right-arrow'){
      if(tasksInProgress.children.length === 5){
        let modalMaxElements = document.querySelector('.modal__max-elements');
        modalMaxElements.style.display = 'block';
        document.querySelector('.modals__button-yes-max').addEventListener('click', function(){
        modalMaxElements.style.display = 'none';
        createTaskNumber()
        })
      } else {
        tasksInProgress.append(divTask);
        taskIconRightArrow.classList.remove('task__right-arrow');
        taskIconRightArrow.classList.add('task__right-arrow-in-progress');
        createTaskNumber()
      }
    } else if(event.target.className === 'task__right-arrow-in-progress'){
      tasksDone.append(divTask);
      taskIconRightArrow.classList.remove('task__right-arrow-in-progress');
      taskIconRightArrow.classList.add('task__right-arrow-done');
      createTaskNumber()
    } else if(event.target.className === 'task__right-arrow-done'){
      tasksTextToDo.append(divTask);
      taskIconRightArrow.classList.remove('task__right-arrow-done');
      taskIconRightArrow.classList.add('task__right-arrow');
      createTaskNumber()
    }
  })
}

buttonClearAllToDo.addEventListener('click', function(){
  if(tasksTextToDo.children.length > 0) {
    tasksTextToDo.innerHTML = '';
    createTaskNumber()
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
    createTaskNumber()
  } 
});

buttonCloseModals.addEventListener('click', function(){
  popup.style.display = 'none';
  createTaskNumber() 
});

document.querySelector('.modals__button-yes').addEventListener('click', function(){
  popup.style.display = 'none';
  tasksInProgress.innerHTML = '';
  createTaskNumber() 
});
