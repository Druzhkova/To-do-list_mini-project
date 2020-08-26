let popup = document.querySelector('.modal__clear-all');
let buttonDeleteInProgressList = document.querySelector('#button-in-progress-list');
let buttonCloseModals = document.querySelector('.modals__button-no');

buttonDeleteInProgressList.addEventListener('click', function(){
  popup.style.display = 'block';
});

buttonCloseModals.addEventListener('click', function(){
  popup.style.display = 'none';
});

window.addEventListener('click', function(event){
  if(event.target === popup) {
    popup.style.display = 'none';
  }
});

let inputTask = document.querySelector('.input-task');
let inputData = document.querySelector('.input-data');
let buttonAddTask = document.querySelector('.to-do-list-header__button');

inputTask.addEventListener('focus', function(){
  inputTask.placeholder = "";
})

inputTask.addEventListener('blur', function(){
  if(inputTask.value === "")
  inputTask.placeholder = 'enter new task';
})


buttonAddTask.addEventListener('click', function(){
  if(!(inputTask.value === "")){
    createElements(`${inputData.value} ${inputTask.value}`);
    inputData.value = '';
    inputTask.value = '';
  }
})

let taskTextToDo = document.querySelectorAll('.task__text-to-do');
let iconsTaskToDo = document.querySelectorAll('#task__icons-to-do');

function createElements(text){
  for(let i = 0; i < taskTextToDo.length; i++) {
    if(taskTextToDo[i].innerHTML === '') {
      taskTextToDo[i].innerHTML = text;
      break;
    } 
  }
  
  for(let i = 0; i < iconsTaskToDo.length; i++) {
    if(iconsTaskToDo[i].className !== 'task__icons') {
      iconsTaskToDo[i].className = 'task__icons';
      break;
    } 
  }

}

let buttonsCross = document.querySelectorAll('.task__cross');
for(let i = 0; i < buttonsCross.length; i++) {
  buttonsCross[i].addEventListener('click', function(){
    buttonsCross[i].parentElement.classList.remove('task__icons');
    buttonsCross[i].parentElement.parentElement.children[0].children[1].textContent = '';
  })  
}

let buttonClearAllToDo = document.querySelector('#clear-all-to-do');

buttonClearAllToDo.addEventListener('click', function(){
  for(let i = 0; i < taskTextToDo.length; i++) {
    if(taskTextToDo[i].innerHTML) {
      taskTextToDo[i].innerHTML = '';
    } 
  }

  for(let i = 0; i < iconsTaskToDo.length; i++) {
    if(iconsTaskToDo[i].className === 'task__icons') {
      iconsTaskToDo[i].classList.remove('task__icons');
    } 
  }

})
