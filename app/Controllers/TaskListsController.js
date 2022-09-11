// @ts-nocheck
import { appState } from "../AppState.js";
import { taskListsService } from "../Services/TaskListsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
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
    appState.on("tasks", _drawTaskLists);
    _drawTaskLists();
  }

  createTaskList() {
    try {
      window.event.preventDefault();
      let form = window.event.target;
      let formData = getFormData(form);
      taskListsService.createTaskList(formData);
      form.reset();
      this.loadDefaultColor();
    } catch (error) {
      console.error("createTaskList", error);
    }
  }

  async deleteTaskList(taskListID, color) {
    if (await Pop.confirm(color)) {
      taskListsService.deleteTaskList(taskListID);
    }
  }

  showToast() {}

  handleOnInput(event) {
    let root = document.querySelector(":root");

    console.log(event.target.value);
    root.style.setProperty("--taskListInputColor", event.target.value);
  }

  loadDefaultColor() {
    document.getElementById("taskListColorInput").value = appState.defaultColor;
    document
      .querySelector(":root")
      .style.setProperty("--taskListInputColor", appState.defaultColor);
  }
}
