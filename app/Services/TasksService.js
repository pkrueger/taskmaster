import { appState } from "../AppState.js";
import { Task } from "../Models/Task.js";
import { saveState } from "../Utils/Store.js";

class TasksService {
  createTask(formData) {
    appState.tasks = [...appState.tasks, new Task(formData)];
    saveState("tasks", appState.tasks);
  }

  deleteTask(taskID) {
    appState.tasks = appState.tasks.filter((task) => task.taskID != taskID);
    saveState("tasks", appState.tasks);
  }

  toggleIsComplete(taskID) {
    let task = appState.tasks.find((task) => task.taskID == taskID);
    task.isComplete = !task.isComplete;

    appState.emit("tasks");
    saveState("tasks", appState.tasks);
  }
}

export const tasksService = new TasksService();
