const todo = document.querySelector('#todo');
const doing = document.querySelector('#progress');
const done = document.querySelector('#done');

const toggleModalBtn = document.querySelector('#toggle-modal');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal .bg');
const addTaskBtn = document.querySelector('#add-new-task-btn');
const titleInput = document.querySelector('#task-title');
const descInput = document.querySelector('#task-description');

const columns = [todo, doing, done];
const STORAGE_KEY = 'kanban_tasks';

let dragElement = null;
let tasks = [];

function getRandomId() {
    return Date.now().toString() + Math.random().toString(16).slice(2);
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
        tasks = JSON.parse(stored);
    } else {
        tasks = getInitialTasksFromDOM();
    }
}

function getInitialTasksFromDOM() {
    const initialTasks = [];

    columns.forEach((column) => {
        const taskElements = column.querySelectorAll('.task');

        taskElements.forEach((taskEl) => {
            const title = taskEl.querySelector('h2')?.textContent || '';
            const description = taskEl.querySelector('p')?.textContent || '';

            initialTasks.push({
                id: getRandomId(),
                title: title.trim(),
                description: description.trim(),
                column: column.id,
            });
        });
    });

    return initialTasks;
}

function createTaskElement(task) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.draggable = true;
    taskDiv.dataset.id = task.id;

    taskDiv.innerHTML = `
        <h2>${task.title}</h2>
        <p>${task.description}</p>
        <button class="delete-btn">Delete</button>
    `;

    taskDiv.addEventListener('dragstart', () => {
        dragElement = taskDiv;
        taskDiv.classList.add('dragging');
    });

    taskDiv.addEventListener('dragend', () => {
        taskDiv.classList.remove('dragging');
        dragElement = null;
        columns.forEach((column) => column.classList.remove('hover-over'));
        saveTasks();
    });

    taskDiv.querySelector('.delete-btn').addEventListener('click', () => {
        tasks = tasks.filter((item) => item.id !== task.id);
        renderBoard();
        saveTasks();
    });

    return taskDiv;
}

function updateCounts() {
    columns.forEach((column) => {
        const countEl = column.querySelector('.count');
        const count = tasks.filter((task) => task.column === column.id).length;
        countEl.textContent = count;
    });
}

function renderBoard() {
    columns.forEach((column) => {
        const oldTasks = column.querySelectorAll('.task');
        oldTasks.forEach((task) => task.remove());
    });

    tasks.forEach((task) => {
        const column = document.querySelector(`#${task.column}`);
        if (!column) return;

        const taskEl = createTaskElement(task);
        column.appendChild(taskEl);
    });

    updateCounts();
}

function addDragEventOnColumn(column) {
    column.addEventListener('dragenter', (e) => {
        e.preventDefault();
        column.classList.add('hover-over');
    });

    column.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    column.addEventListener('dragleave', (e) => {
        if (e.target === column) {
            column.classList.remove('hover-over');
        }
    });

    column.addEventListener('drop', (e) => {
        e.preventDefault();

        if (!dragElement) return;

        const taskId = dragElement.dataset.id;
        const task = tasks.find((item) => item.id === taskId);

        if (task) {
            task.column = column.id;
            renderBoard();
            saveTasks();
        }

        column.classList.remove('hover-over');
    });
}

function openModal() {
    modal.classList.add('show');
}

function closeModal() {
    modal.classList.remove('show');
    titleInput.value = '';
    descInput.value = '';
}

toggleModalBtn.addEventListener('click', openModal);

modalBg.addEventListener('click', closeModal);

addTaskBtn.addEventListener('click', () => {
    const taskTitle = titleInput.value.trim();
    const taskDescription = descInput.value.trim();

    if (taskTitle === '' || taskDescription === '') {
        alert('Please enter both title and description');
        return;
    }

    const newTask = {
        id: getRandomId(),
        title: taskTitle,
        description: taskDescription,
        column: 'todo',
    };

    tasks.push(newTask);
    renderBoard();
    saveTasks();
    closeModal();
});

columns.forEach((column) => addDragEventOnColumn(column));

loadTasks();
renderBoard();