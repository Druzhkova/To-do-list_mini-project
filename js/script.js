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
  if(inputTask.value !== "" && inputData.value !== "" ){
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

function createElements(text){
  let divTask = document.createElement('div');
  divTask.id = 'task';
  tasksTextToDo.append(divTask);

  let pTaskText = document.createElement('p');
  pTaskText.id = 'task__text';
  divTask.append(pTaskText);
  pTaskText.textContent = text;

  let divTaskIcons = document.createElement('div');
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

  taskIconCross.addEventListener('click', function(event) {
    if(event.target.previousSibling.className === 'task__right-arrow' || event.target.previousSibling.className === 'task__right-arrow-done') {
      divTask.remove();   
    } else if(event.target.previousSibling.className === 'task__right-arrow-in-progress'){
      let deleteModalInProgress = document.querySelector('.modal__delete-task-in-progress')
      deleteModalInProgress.style.display = 'block';
      let buttonDeleteTask = document.querySelector('.modals__button-yes-delete-task');
      buttonDeleteTask.addEventListener('click', function(){
        deleteModalInProgress.style.display = 'none';
        divTask.remove(); 
      });
      let buttonNoDeleteTask = document.querySelector('.modals__button-no-delete-task');
      buttonNoDeleteTask.addEventListener('click', function(){
        deleteModalInProgress.style.display = 'none';
      })
    }
  })
  
  divTask.addEventListener('click', function(event){
    if(event.target.className === 'task__right-arrow'){
      if(tasksInProgress.children.length === 6){
        let modalMaxElements = document.querySelector('.modal__max-elements');
        modalMaxElements.style.display = 'block';
        document.querySelector('.modals__button-yes-max').addEventListener('click', function(){
          modalMaxElements.style.display = 'none';
        })
      } else {
        tasksInProgress.append(divTask);
        taskIconRightArrow.classList.remove('task__right-arrow');
        taskIconRightArrow.classList.add('task__right-arrow-in-progress');
      }
    } else if(event.target.className === 'task__right-arrow-in-progress'){
      tasksDone.append(divTask);
      taskIconRightArrow.classList.remove('task__right-arrow-in-progress');
      taskIconRightArrow.classList.add('task__right-arrow-done');
    } else if(event.target.className === 'task__right-arrow-done'){
      tasksTextToDo.append(divTask);
      taskIconRightArrow.classList.remove('task__right-arrow-done');
      taskIconRightArrow.classList.add('task__right-arrow');
    }
  })
}

buttonClearAllToDo.addEventListener('click', function(){
  if(tasksTextToDo.children.length > 0) {
    tasksTextToDo.innerHTML = '';
  } 
})

buttonClearAllDone.addEventListener('click', function(){
  if(tasksDone.children.length > 0) {
    tasksDone.innerHTML = '';
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
});
