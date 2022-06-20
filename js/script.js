// Form Variable
const form = document.querySelector('#task-form');

// Task List UL Variable
const taskList = document.querySelector('.collection');

// Clear Btn Variable
const clearBtn = document.querySelector('.clear-tasks');

// Filter Field Variable
const filter = document.querySelector('#filter');

// Task Input Variable
const taskInput = document.querySelector('#task');

// Add Task Event Listener
form.addEventListener('submit', addTask);

// Remove Task Event Listener
taskList.addEventListener('click', removeTask);

// Clear Task Event Listener
clearBtn.addEventListener('click', clearTask);

// Filter Task Event Listener
filter.addEventListener('keyup', filterTask);

// Add Task Function
function addTask(e) {

    if (taskInput.value === '') {
        alert('Please input task');
    }   else {
        // Create li element
        const li = document.createElement('li');
        // Add class to li
        li.className = 'collection-item';
        // Create text node for li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create anchor tag / link
        const link = document.createElement('a');
        // Add class to link
        link.className = 'delete-item secondary-content';
        // Add HTML Icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append link to li
        li.appendChild(link);
        // Append li to ul / collection
        taskList.appendChild(li);

        // Add task to local storage

        let tasks;

        if (localStorage.getItem('tasks') == null) {
            tasks = [];
        }   else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.push(taskInput.value);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Clear New Task Field
        taskInput.value = '';

        }

    e.preventDefault();
}

// Load all tasks inside Local Storage

let tasksInLS;

document.addEventListener('DOMContentLoaded', function() {

    if (localStorage.getItem('tasks') == null) {
        tasksInLS = [];
    }   else {
        tasksInLS = JSON.parse(localStorage.getItem('tasks'));

        tasksInLS.forEach(function(task) {

            // Create li element
            const li = document.createElement('li');
            // Add class to li
            li.className = 'collection-item';
            // Create text node for li
            li.appendChild(document.createTextNode(task));
            // Create anchor tag / link
            const link = document.createElement('a');
            // Add class to link
            link.className = 'delete-item secondary-content';
            // Add HTML Icon
            link.innerHTML = '<i class="fa fa-remove"></i>';
            // Append link to li
            li.appendChild(link);
            // Append li to ul / collection
            taskList.appendChild(li);
    
        });
    }
});

// Remove Task Function
function removeTask (e) {

    let taskIndex;

    let tasks;

    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Delete item?')) {
            e.target.parentElement.parentElement.remove();

            // Remove task in local storage

            tasks = JSON.parse(localStorage.getItem('tasks'));
            
            if (tasks.indexOf(e.target.parentElement.parentElement.textContent != -1)) {

                taskIndex = tasks.indexOf(e.target.parentElement.parentElement.textContent);

                tasks.splice(taskIndex, 1);

                localStorage.setItem('tasks', JSON.stringify(tasks));

            }

        }
    }

}

// Clear Task Function
function clearTask() {

    // Option 1
    // taskList.innerHTML = '';

    // Option 2 | Faster than Option 1
    if (confirm('Are you sure to delete all the task?')) {
        while (taskList.firstChild) {
            taskList.firstChild.remove();

            // Remove all tasks in local storage
            localStorage.clear('tasks');
        }
    }

    
}

// Filter Task Function

function filterTask(e) {

    const lis = document.querySelectorAll('.collection-item');
    const filterInput = e.target.value.toLowerCase();

    lis.forEach(function(liItem) {

        if (liItem.textContent.toLocaleLowerCase().indexOf(filterInput) != -1) {
            liItem.style.display = 'block';
        }   else {
            liItem.style.display = 'none';
        }

    });
}