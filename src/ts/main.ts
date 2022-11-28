import { Task } from "./models/Task";
function sendToLS(task: Task[]): void {
  localStorage.setItem("todolist", JSON.stringify(task));
}

let todoList: Task[] = [];
function getFromLS() {
  todoList = JSON.parse(localStorage.getItem("todolist") || "[]");
}

function deleteTask(taskList: Task[], index: number) {
  taskList.splice(index, 1);
  sendToLS(taskList);
}
