//grabbing elements
const form = document.querySelector('#task_form');
const taskInput = document.querySelector('#new_task');
const todo = document.querySelector('#todo');
const completed = document.querySelector('#completed');
const clrTask = document.querySelector('#clr_task_btn');
const clrCompleted = document.querySelector('#clr_completed')
const todoFilter = document.querySelector('#todo_filter');
const completedFilter = document.querySelector('#completed_filter')


//adding event listener
form.addEventListener('submit', e => {
    if (taskInput.value === ''){
        alert('empty');
    } else {
        addTask(todo, taskInput.value);
        taskInput.value = '';
        e.preventDefault(); 
    }
});
todo.addEventListener('click', removeTask);
todo.addEventListener('click', completeTask);
clrTask.addEventListener('click', () => {
    clearTask(todo);
});
clrCompleted.addEventListener('click', () => {
    clearTask(completed);
});

todoFilter.addEventListener('keyup', e => {
    filter(e, '#todo > li');
});
completedFilter.addEventListener('keyup', e => {
    filter(e, '#completed > li');
});

//adding task
function addTask (list, task) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(task + ' '));
    if (list == todo) {
        let rmv_btn = document.createElement('button');
        rmv_btn.appendChild(document.createTextNode('Remove'));
        rmv_btn.setAttribute('class', 'rmv_btn');
        li.appendChild(rmv_btn);

        let done_btn = document.createElement('button');
        done_btn.appendChild(document.createTextNode('Done'));
        done_btn.setAttribute('class', 'done_btn');
        li.appendChild(done_btn);
    }

    list.appendChild(li);
};

//removing task
function removeTask (e) {
    let cls = e.target.getAttribute('class');
    if (cls == 'rmv_btn') {
        let ele = e.target.parentElement;
        ele.remove();
    }
};

//completing task
function completeTask (e) {
    let cls = e.target.getAttribute('class');
    if (cls == 'done_btn') {
        let parent = e.target.parentElement;
        let ele = parent.firstChild.textContent;
        addTask(completed, ele);
        parent.remove();  

    }
};

//clear task
function clearTask (list) {
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }
};

//filtering task
function filter (e, list) {
    let text = e.target.value.toLowerCase();

    document.querySelectorAll(list).forEach(task => {
    let item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
    } else {
        task.style.display = 'none';
    }
    })
};
