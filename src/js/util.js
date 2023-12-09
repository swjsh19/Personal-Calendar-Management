const Type = {
    Todo: 1,
    Done: 2,
    Pending: 3
};

const Priority = {
    First: 1,
    Second: 2,
    Third: 3
};

const Days = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7            
};



let tasks = [];

function addToList(task){
    let div = document.createElement("div");
    div.className = "task p-1 rounded-2 ps-2 d-flex align-items-center my-1"
    if(task.prior === Priority.First){
        div.style.background = '#FBB4AE';
    }
    else if(task.prior === Priority.Second){
        div.style.background = '#FFFFCC';
    }
    else{
        div.style.background = '#CCEBC5';
    }
    div.style.borderRadius = "5px";
    div.style.padding = "2px";

    let span = document.createElement("span");
    span.classList.add("me-auto");
    span.style.fontWeight = "lighter";


    span.textContent = task.text;
    div.appendChild(span);

    if(task.type === Type.Todo){
        let buttonDone = document.createElement("button");
        buttonDone.classList.add("btn", "btn-sm", "btn-success", "me-1");
        buttonDone.innerHTML = '<i class="bi bi-check"></i>';
        div.appendChild(buttonDone);

        //V - button : Todo => Done
        buttonDone.addEventListener("click", () => {
            task.type = Type.Done;
            div.remove();
            addToList(task);
            saveTasks();
        })
    }
    


    let ClearBtn = document.querySelector("#clear-btn");

    ClearBtn.addEventListener("click", () =>{
        if(task.type === Type.Todo){
            task.type = Type.Pending;
            div.remove();
            addToList(task);
            saveTasks();
        }
        if(task.type === Type.Done){
            div.remove();
            tasks = tasks.filter(t => t !== task);
            saveTasks();
        }
    });
    


    //X - button create
    let buttonRemove = document.createElement("button");
    buttonRemove.classList.add("btn", "btn-sm", "btn-danger");
    let iElem = document.createElement("i");
    iElem.classList.add("bi", "bi-x");
    buttonRemove.appendChild(iElem);
    div.appendChild(buttonRemove);
    
    buttonRemove.addEventListener("click", () => {
        div.remove();
        tasks = tasks.filter(t => t !== task);
        saveTasks();
    });


    let list;
    if(task.Day === Days.Mon){
        list = document.querySelector(task.type === Type.Todo ? "#task-list1" : (task.type === Type.Done ?"#done-list1" : "#Pending-list"));
    }
    else if(task.Day === Days.Tue){
        list = document.querySelector(task.type === Type.Todo ? "#task-list2" : (task.type === Type.Done ?"#done-list2" : "#Pending-list"));
    }
    else if(task.Day === Days.Wed){
        list = document.querySelector(task.type === Type.Todo ? "#task-list3" : (task.type === Type.Done ?"#done-list3" : "#Pending-list"));
    }
    else if(task.Day === Days.Thu){
        list = document.querySelector(task.type === Type.Todo ? "#task-list4" : (task.type === Type.Done ?"#done-list4" : "#Pending-list"));
    }
    else if(task.Day === Days.Fri){
        list = document.querySelector(task.type === Type.Todo ? "#task-list5" : (task.type === Type.Done ?"#done-list5" : "#Pending-list"));
    }
    else if(task.Day === Days.Sat){
        list = document.querySelector(task.type === Type.Todo ? "#task-list6" : (task.type === Type.Done ?"#done-list6" : "#Pending-list"));
    }
    else{
        list = document.querySelector(task.type === Type.Todo ? "#task-list7" : (task.type === Type.Done ?"#done-list7" : "#Pending-list"));
    }
    list.appendChild(div);
}


function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
    let lastTasks = localStorage.getItem("tasks");
    if(!lastTasks) return;

    tasks = JSON.parse(lastTasks);
    tasks.forEach(t => {
        addToList(t);
    });
}

window.addEventListener("load", () => {
    loadTasks();
});

let addBtn = document.querySelector("#add-btn");

addBtn.addEventListener("click", () => {
    // 1. Read the text in #task-input.
    let input = document.querySelector("#task-input");

    let text = input.value;
    if (!text.length) return;

    let prior_ = document.querySelector('input[name="btnradio"]:checked').value;
    let Select_Day = document.getElementById("Day").value;

    // 2. Create a new Task object.
    let task = {
        text: text,
        type: Type.Todo,
        prior: Priority[prior_],
        Day: Days[Select_Day]
    };

    // 3. Append the new Task object to tasks
    tasks.push(task);
    saveTasks();
    // 4. Create a new task item and attach it to #task-list.
    addToList(task);

    // 5. Clear #task-input.
    input.value = "";
    prior_.value = "";
});



// let ClearBtn = document.querySelector("#clear-btn");

// ClearBtn.addEventListener("click", () =>{
//     for (const taskId in tasks) {
//         if (tasks.hasOwnProperty(taskId)) {
//             tasks[taskId].type = Type.Pending;
//             addToList(tasks[taskId]);
//         }
//     }
//     // saveTasks();
//     // loadTasks();
// });
