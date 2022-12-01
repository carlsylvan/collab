import { Task } from "./models/Task";
let todoList: Task[] = [];
// Here are loading data from localStorage direct when browser is starting/refreshing
getFromLS();
createHtml(todoList);
let todoForm: HTMLFormElement = document.getElementById(
  "todoForm"
) as HTMLFormElement;
let inputEL: HTMLInputElement = document.getElementById(
  "myInput"
) as HTMLInputElement;

todoForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  let todo = new Task(inputEL.value, true);
  todoList.push(todo);
  inputEL.value = "";
  sendToLS(todoList);
  getFromLS();
  createHtml(todoList);
});

function sendToLS(task: Task[]): void {
  localStorage.setItem("todolist", JSON.stringify(task));
}

function getFromLS() {
  let todoArray : [] = JSON.parse(localStorage.getItem("todolist") || "[]");
  todoList = todoArray.map((todos:Task)=>{
    return new Task(todos.taskDescription, todos.status)
  })
}

function createHtml(someList: Task[]) {
  let todoContainer: HTMLDivElement = document.getElementById(
    "taskList"
  ) as HTMLDivElement;
  todoContainer.innerHTML = "";
  for (let i = 0; i < someList.length; i++) {
    let todo: HTMLLIElement = document.createElement("li");
    let todoDesc: HTMLSpanElement = document.createElement("span");
    todoDesc.innerHTML = someList[i].taskDescription;
    let deleteBtn: HTMLButtonElement = document.createElement("button");
    deleteBtn.classList.add("delete-button");
    deleteBtn.innerHTML = "Delete";
    todoContainer.appendChild(todo);
    todo.appendChild(todoDesc);
    todo.appendChild(deleteBtn);
    if(someList[i].status===true){
      todoDesc.classList.remove("done");
    }
    else {
      todoDesc.classList.add("done");
    }
    todoDesc.addEventListener("click", ()=>{
      if(someList[i].status===false){
        someList[i].status = true;
      }
      else {
        someList[i].status = false;
      }
        sendToLS(someList);
        createHtml(someList);
    })
    deleteBtn.addEventListener("click", () => {
      deleteTask(todoList, i);
      getFromLS();
      createHtml(todoList);
    });
  }
}

function deleteTask(taskList: Task[], index: number) {
  taskList.splice(index, 1);
  sendToLS(taskList);
}
