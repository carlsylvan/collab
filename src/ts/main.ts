function sendToLS(task: []): void {
  localStorage.setItem("todolist", JSON.stringify(task));
}
