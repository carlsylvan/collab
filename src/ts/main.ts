
let todoList : [] = [];
function getFromLS(){
    todoList = JSON.parse(localStorage.getItem("todolist") || "[]");
}