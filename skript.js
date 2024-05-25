// Retrive todo from a local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo"))|| [];


const todoInput = document.getElementById("todoInput");

const todoList=document.getElementById("todoList");

const todoCount=document.getElementById("todoCount");

const addButton=document.querySelector(".btn");

const deleteButton =document.getElementById("deleteButton");

//Initialize
document.addEventListener("DOMContentLoaded", function(){
    addButton.addEventListener("click",addTask);
    todoInput.addEventListener('keydown', function(event){
        if(event.key === "Enter"){
                event.preventDefault();
                addTask();            
        }
    });
    deleteButton.addEventListener("click",deleteAlltasks);
    displayTasks();
}   );

function addTask(){

    const newtask =todoInput.value.trim();
    //trim trims away spaces
    if(newtask !=="" ){
        todo.push({
            text:newtask,
            disabled :false,
        });
        saveToLocalStorage();
        todoInput.value="";
        displayTasks();
    }
}
function deleteAlltasks(){
    

}
function displayTasks() {
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
        <div class="todo-container">
            <input type="checkbox" class="todo-checkbox" 
            id="input-${index}" ${item.disabled ? "checked" : ""}>
            <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}" onclick="editTask(${index})">${item.text}</p>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        </div>
        `;
        p.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index);
        });
        todoList.appendChild(p);
    });
    todoCount.textContent = todo.length;
}

function editTask(index){
    const todoItem =document.getElementById(`todo-${index}`);
    const existingText=todo[index].text;
    const inputElement =document.createElement("input");

    inputElement.value =existingText;
    todoItem.replaceWith(inputElement);

    inputElement.focus();

    inputElement.addEventListener("blur",function(){
        const updatedText =inputElement.value.trim();
        if(updatedText){
            todo[index].text=updatedText;
            saveToLocalStorage();
        }
        
        displayTasks();
    });

}

function toggleTask(index){
    todo[index].disabled=!todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}
function deleteTask(index) {
    todo.splice(index, 1);
    saveToLocalStorage();
    displayTasks();
}


function deleteAlltasks(){
    todo=[];
    saveToLocalStorage();
    displayTasks();
}

function saveToLocalStorage(){
    localStorage.setItem("todo",JSON.stringify(todo));
}
