document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    loadTasks();

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            addTask(taskText);
            saveTasks();
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            const li = e.target.closest('li');
            const taskText = li.querySelector('span').innerText;
            deleteTask(taskText);
            saveTasks();
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(li);
    }

    function deleteTask(taskText) {
        const tasks = getTasks();
        const updatedTasks = tasks.filter(task => task !== taskText);
        saveTasks(updatedTasks);
        loadTasks();
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks || getTasks()));
    }

    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    function loadTasks() {
        const tasks = getTasks();
        taskList.innerHTML = '';
        tasks.forEach(taskText => addTask(taskText));
    }
});
