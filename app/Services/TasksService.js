import { appState } from "../AppState.js";
import { TaskListsController } from "../Controllers/TaskListsController.js";
import { Task } from "../Models/Task.js";
import { Pop } from "../Utils/Pop.js";
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

  toggleIsComplete(taskID, taskListID) {
    let task = appState.tasks.find((task) => task.taskID == taskID);
    task.isComplete = !task.isComplete;

    this.toggleShowToast(taskListID);

    appState.emit("tasks");
    saveState("tasks", appState.tasks);
  }

  toggleShowToast(taskListID) {
    let taskList = appState.taskLists.find(
      (list) => list.taskListID == taskListID
    );

    console.log(appState.taskLists);

    if (
      taskList.Tasks.length > 0 &&
      !taskList.TasksIncomplete &&
      taskList.showToast
    ) {
      this.showToast(taskList.taskListColor);
      taskList.showToast = !taskList.showToast;
    } else if (!taskList.showToast && taskList.TasksIncomplete) {
      taskList.showToast = !taskList.showToast;
    }

    console.log(appState.taskLists);
    appState.emit("taskLists");
    saveState("taskLists", appState.taskLists);
  }

  showToast(color) {
    Pop.toast(
      color,
      "Good work! You completed a list!",
      "success",
      "top-end",
      3000,
      false
    );
  }
}

export const tasksService = new TasksService();
