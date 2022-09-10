import { appState } from "../AppState.js";
import { TaskList } from "../Models/TaskList.js";
import { saveState } from "../Utils/Store.js";

class TaskListsService {
  createTaskList(formData) {
    appState.taskLists = [...appState.taskLists, new TaskList(formData)];
    saveState("taskLists", appState.taskLists);
  }
}

export const taskListsService = new TaskListsService();
