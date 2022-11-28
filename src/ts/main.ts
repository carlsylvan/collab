import { Task } from "./models/Task";
function sendToLS(task: []): void {
  localStorage.setItem("todolist", JSON.stringify(task));
}
