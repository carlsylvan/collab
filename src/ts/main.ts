import { Task } from "./models/Task";
let todoList: Task[] = [];
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
  sendToLS(todoList);
  getFromLS();
  createHtml(todoList);
});

function sendToLS(task: Task[]): void {
  localStorage.setItem("todolist", JSON.stringify(task));
}

function getFromLS() {
  todoList = JSON.parse(localStorage.getItem("todolist") || "[]");
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
    deleteBtn.innerHTML = "Delete";
    todoContainer.appendChild(todo);
    todo.appendChild(todoDesc);
    todo.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", deleteTask);
  }
}

function deleteTask(taskList: Task[], index: number) {
  taskList.splice(index, 1);
  sendToLS(taskList);
}
