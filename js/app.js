//* Variables
const btnAddTask = document.getElementById('add-task');
const btnsColors = document.getElementById('todo-color');
const listTask = document.querySelector('.list-todo-list');
let bntColorSelected;
let idTask = Math.random();
let dataTask;

//* Event Listeners
eventListeners();

function eventListeners() {
    btnsColors.addEventListener('click', selectColor);
    btnAddTask.addEventListener('click', addTask);
    listTask.addEventListener('click', deleteTask);
    document.addEventListener('DOMContentLoaded', readLocalStorage);
}

//* Funciones
function addTask(e) {
    e.preventDefault();

    const textTask = document.querySelector('#todo-text').value;
    let dateTask = document.querySelector('#todo-date').value;

    if (textTask === '' || dateTask === '' || bntColorSelected === undefined) {
        messageInfo('¡Tienes que llenar todos los campos!', 'error');
    } else {
        idTask += 1;
        createTask(idTask, textTask, dateTask, bntColorSelected);
        emptyField();
        messageInfo('Tarea agregada con éxito', 'check');
    }
}

//* Select Color of task of DOM
function selectColor(e) {
    bntColorSelected = e.target.value;
}

//* Create Task of DOM
function createTask(idTask, textTask, dateTask, bntColorSelected) {
    let templateHTML = `
        <a href="#" id=${idTask}>x</a>
        <p class="text">${textTask}</p>
        <p class="date">${dateTask}</p>
    `;
    let div = document.createElement('div');
    div.classList.add(bntColorSelected, 'todo-list');
    div.innerHTML = templateHTML;
    listTask.appendChild(div);

    let taskCreated = {
        text: textTask,
        date: dateTask,
        btn: bntColorSelected,
        id: idTask
    }
    AddTaskLocalStorage(taskCreated);
}

//* Delete Task and take ID Task
function deleteTask(e) {
    e.preventDefault();
    let task,
        taskID;
    task = e.target.parentElement;

    if (task.classList.contains('todo-list')) {
        taskID = task.querySelector('a').getAttribute('id');
        task.remove();
        messageInfo('Tarea Eliminada', 'error');

        deleteTaskLocalStorage(taskID);
    }
}

//* Empty field of DOM
function emptyField() {
    document.querySelector('#todo-text').value = '';
    document.querySelector('#todo-date').value = '';
}

//* Add Task of Local Storage
function AddTaskLocalStorage(taskCreated) {
    let task;
    task = getTaskLocalStorage();
    task.push(taskCreated);
    localStorage.setItem('task', JSON.stringify(task));
}

//* Delete Task of Local Storage
function deleteTaskLocalStorage(taskID) {
    let taskLS;
    taskLS = getTaskLocalStorage();

    taskLS.forEach(function(idTask, index) {
        if (idTask.id == taskID) {
            taskLS.splice(index, 1);
        }
    });
    localStorage.setItem('task', JSON.stringify(taskLS));
}

//* get Task of LocalStorage
function getTaskLocalStorage() {
    let taskLS;

    //Comprobamos si hay algo en el local Storage
    if (localStorage.getItem('task') === null) {
        taskLS = [];
    } else {
        taskLS = JSON.parse(localStorage.getItem('task'));
    }
    return taskLS;
}

//* Read Local Storage
function readLocalStorage() {
    let taskLS;

    taskLS = getTaskLocalStorage();

    taskLS.forEach(function(task) {
        let templateHTML = `
        <a href="#" id=${task.id}>x</a>
        <p class="text">${task.text}</p>
        <p class="date">${task.date}</p>
        `;
        let div = document.createElement('div');
        div.classList.add(task.btn, 'todo-list');
        div.innerHTML = templateHTML;
        listTask.appendChild(div);
    });
}

//* Show Message DOM
function messageInfo(message, type) {
    const div = document.querySelector('#message-info');
    div.classList.add('active');
    const p = document.createElement('p');

    if (type === 'error') {
        p.classList.add(type);
        p.innerText = message;
        div.appendChild(p);
        setTimeout(function() {
            div.classList.remove('active');
            div.removeChild(p);
        }, 2000);
    } else {
        p.classList.add(type);
        p.innerText = message;
        div.appendChild(p);
        setTimeout(function() {
            div.classList.remove('active');
            div.removeChild(p);
        }, 2000);
    }
}