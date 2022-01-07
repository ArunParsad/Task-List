//Define UI Vars

const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskinput = document.querySelector('#task');
console.log(taskinput);

//load all event listners
loadEventListners();

// creat funcation
function loadEventListners(){
    //add task event
    form.addEventListener('submit', addTask);
    
    //remove task event
    tasklist.addEventListener('click', removeTask)

    //clear task event

    clearBtn.addEventListener('click', clearTasks);


    //filter tasks event
    filter.addEventListener('keyup', filterTask);

    //DOMload event listner
    document.addEventListener('DOMContentLoaded', getTasks);


}

//add task
function addTask(e){
    if(taskinput.value === ''){
        alert('Add a task')
    }
    const li = document.createElement('li');
    //add a class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskinput.value));
    //creat new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    //add icon html
    link.innerHTML = '<i class="fas fa-trash"></i>';

    //Append the link to li
    li.appendChild(link);

    //add task in ls
    storeTaskInLocalStorage(taskinput.value);

    //Append li to ul
    tasklist.appendChild(li);
    console.log(li);
    tasklist.value = '';
    taskinput.value = '';
    e.preventDefault();
}


//remove task
function removeTask(e){


    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure')){
            e.target.parentElement.parentElement.remove();

            //remove from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

    
    e.preventDefault();
}

//clear tasks

function clearTasks(){


// tasklist.innerHTML = '';


while(tasklist.firstChild){
    tasklist.removeChild(tasklist.firstChild);
}


//clear from the local storage
clearTasksFromLocalStorage();

}



//clear task from ls
function clearTasksFromLocalStorage(){
    localStorage.clear();
}


function filterTask(e){
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';

        }else{
            task.style.display = 'none';
        }
    });
}

// store in local storage


function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//get task from ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        //add a class
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        //creat new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
    
        //add icon html
        link.innerHTML = '<i class="fas fa-trash"></i>';
    
        //Append the link to li
        li.appendChild(link);
        //Append task to ul
        tasklist.appendChild(li);
    })
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}