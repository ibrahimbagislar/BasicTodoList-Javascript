
const form = document.querySelector("#todoAddForm");
const todoList = document.querySelector(".list-group");
const addInput = document.querySelector("#todoName");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const searchInput = document.querySelector("#todoSearch");


var todos = [];

runEvents();

function runEvents(){
    form.addEventListener("submit",addToDo);
    window.addEventListener("DOMContentLoaded",listAllToDo);
    secondCardBody.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",removeAllToDoUI);
    searchInput.addEventListener("keyup",todoFilter);
}

function todoFilter(e){
    const inputValue = e.target.value.toLowerCase().trim();
    const todoListAll = document.querySelectorAll(".list-group-item");
    if(todoListAll.length >= 0)
    {
        todoListAll.forEach(todo => {
            if(todo.textContent.toLowerCase().trim().includes(inputValue)){
                todo.setAttribute("style","display:block");
            }
            else{
                todo.setAttribute("style","display:none !important");
            }
        });
    }
    else{
        showAlert("warning","Filtreleme başarısız. Önce ToDo ekleyin.");
    }
}

function removeAllToDoUI(){
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
    removeAllToDoToStorage();
}

function removeAllToDoToStorage(){
    checkTodosStorage();
    todos.splice(0,todos.length);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function removeTodoToUI(e){
    if(e.target.className == "fa fa-remove")
   {
        const removedTodo = e.target.parentElement.parentElement;
        removedTodo.remove();
        removeTodoToStorage(removedTodo.textContent);
   }
}

function removeTodoToStorage(removedTodo){
    checkTodosStorage();
    let todoIndex = todos.indexOf(removedTodo);
    if(todoIndex != -1)
    {
        todos.splice(todoIndex,1);
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success","To Do başarıyla silindi.");
    }
}

function addToDo(e){
    e.preventDefault();
    const inputText = addInput.value.trim();
    if(inputText == null || inputText == "" )
    {
        showAlert("warning","Lütfen boş bırakmayınız.");
    }
        
    else{
        addToDoUI(inputText);
        addToDoToStorage(inputText);
        showAlert("success","ToDonuz başarıyla eklendi.");
    }
}

function addToDoUI(newToDo){
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newToDo;

    const a = document.createElement("a");
    a.href="#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";
    
    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}

function addToDoToStorage(newToDo){
    checkTodosStorage();
    todos.push(newToDo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodosStorage(){
    if(localStorage.getItem("todos") === null)
    todos = [];
else{
    todos = JSON.parse(localStorage.getItem("todos"));
}
}

function showAlert(type,message){
    let div = document.createElement("div");
    div.className = "alert alert-" + type;
    div.role = "alert";
    div.textContent = message;
    firstCardBody.appendChild(div);


    setTimeout(() => {
        div.remove();
    }, 2000);
}

function listAllToDo(){
    checkTodosStorage();

    if(todos.length >= 1)
        {
            todos.forEach(todo => {
                addToDoUI(todo);
            });
        }
}