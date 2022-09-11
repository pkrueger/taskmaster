import { appState } from "../AppState.js";
import { TaskList } from "../Models/TaskList.js";
import { saveState } from "../Utils/Store.js";

class TaskListsService {
  createTaskList(formData) {
    appState.taskLists = [new TaskList(formData), ...appState.taskLists];
    saveState("taskLists", appState.taskLists);
  }

  deleteTaskList(taskListID) {
    appState.taskLists = appState.taskLists.filter(
      (list) => list.taskListID != taskListID
    );
    saveState("taskLists", appState.taskLists);
  }
}

export const taskListsService = new TaskListsService();
