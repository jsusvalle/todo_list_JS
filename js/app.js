//* Variables
const btnAddTask = document.getElementById('add-task');
const btnsColors = document.getElementById('todo-color');
const listTask = document.querySelector('.list-todo-list');
let bntColorSelected;
let idTask = 0;
let dataTask;

//* Event Listeners
eventListeners();

function eventListeners() {
    btnsColors.addEventListener('click', selectColor);
    btnAddTask.addEventListener('click', addTask);
    listTask.addEventListener('click', deleteTask);
    //document.addEventListener('DOMContentLoaded', readLocalStorage);
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

    readTaskDOM();
    AddTaskLocalStorage(idTask);
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

        deleteTaskLocalStorage(idTask);
    }
}

//* Empty field of DOM
function emptyField() {
    document.querySelector('#todo-text').value = '';
    document.querySelector('#todo-date').value = '';
}

// Read Task of DOM
function readTaskDOM() {
    dataTask = {
        id: listTask.querySelector('a').getAttribute('id'),
        text: listTask.querySelector('p.text').textContent,
        date: listTask.querySelector('p.date').textContent
    }

    console.log(dataTask);
}

//TODO Add Task of Local Storage
function AddTaskLocalStorage(idTask) {

}

//TODO Delete Task of Local Storage
function deleteTaskLocalStorage(idTask) {

}

//TODO get Task of LocalStorage
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

//TODO Read Local Storage
/*
function readLocalStorage() {
    let taskLS;

    taskLS = getTaskLocalStorage();

    cursosLS.forEach(function(curso) {
        //Construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `;
        listaCursos.appendChild(row);
    });
}
*/
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