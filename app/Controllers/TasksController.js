// @ts-nocheck

import { tasksService } from "../Services/TasksService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";

export class TasksController {
  constructor() {}

  createTask() {
    try {
      window.event.preventDefault();
      let form = window.event.target;
      let formData = getFormData(form);
      tasksService.createTask(formData);
      form.reset();
    } catch (error) {
      console.error("createTask", error);
    }
  }

  async deleteTask(taskID, color) {
    if (
      await Pop.confirm(color, "Are you sure?", "This will delete your task!")
    ) {
      tasksService.deleteTask(taskID);
    }
  }

  toggleIsComplete(taskID) {
    tasksService.toggleIsComplete(taskID);
  }
}
