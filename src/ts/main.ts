import { Task } from "./models/Task";
function sendToLS(task: Task[]): void {
  localStorage.setItem("todolist", JSON.stringify(task));
}
