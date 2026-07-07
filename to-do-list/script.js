document.addEventListener("DOMContentLoaded", () =>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if(storedTasks){
        storedTasks.forEach((task) => tasks.push(task));
        updateTasks();
        updateStats();
    }
});
let tasks = [];

const saveTasks = () =>
    localStorage.setItem('tasks', JSON.stringify(tasks))

const addTask = ()=>{
    const taskInput = document.getElementById("taskInput");
    const errorMsg = document.getElementById('errorMsg');
    const taskText = taskInput.value.trim();

    if(taskText === ""){
        errorMsg.textContent = "Please type a task first";
        return;
    }
    errorMsg.textContent = "";

    tasks.push({text:taskText, done:false});
    taskInput.value = "";
    updateTasks();
    updateStats();
    saveTasks();
    
};

const toggleTaskComplete = (index) =>{
    tasks[index].done = !tasks[index].done;
    updateTasks();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasks();
    updateStats();
    saveTasks();
};

const clearAllTasks = () =>{
    tasks = [];
    updateTasks();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.done).length;
    const totalTasks = tasks.length;

    document.getElementById('remainingCount').innerText = `${totalTasks - completedTasks}`;

};

const updateTasks = ()=> {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

       listItem.innerHTML = `
       <div class="task-item">
            <div class="task-item ${task.done ? 'done' : ''}">
                <input type="checkbox" class="done-btn" ${task.done ? 'checked' : ''} />
                <p class="task-text">${task.text}</p>
                <button class="delete-btn">Delete</button>
            </div>
        </div>`;
    const checkbox = listItem.querySelector(".done-btn");
    const deleteBtn = listItem.querySelector(".delete-btn");
    checkbox.addEventListener('change', ()=> toggleTaskComplete(index));
    deleteBtn.addEventListener("click", () => deleteTask(index));
    taskList.append(listItem);

    });
};

document.getElementById('addBtn').addEventListener('click', function(e){
    e.preventDefault();

    addTask();
});

document.getElementById('clearBtn').addEventListener("click", () =>{
    clearAllTasks();
});
