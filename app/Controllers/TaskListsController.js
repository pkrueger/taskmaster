// @ts-nocheck
import { appState } from "../AppState.js";
import { taskListsService } from "../Services/TaskListsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { setHTML } from "../Utils/Writer.js";

function _drawTaskLists() {
  let template = "";
  for (let list of appState.taskLists) {
    template += list.ListTemplate;
  }
  setHTML("taskLists", template);
}

export class TaskListsController {
  constructor() {
    appState.on("taskLists", _drawTaskLists);
  }

  createTaskList() {
    try {
      window.event.preventDefault();
      let form = window.event.target;
      let formData = getFormData(form);
      taskListsService.createTaskList(formData);
      form.reset();
    } catch (error) {
      console.error("createTaskList", error);
    }
  }
}
