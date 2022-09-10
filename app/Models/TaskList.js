import { appState } from "../AppState.js";
import { generateId } from "../Utils/generateId.js";

export class TaskList {
  /**
   *
   * @param {{taskListID:string, taskListName:string, taskListColor:string}} data
   */
  constructor(data) {
    this.taskListID = data.taskListID || generateId();
    this.taskListName = data.taskListName;
    this.taskListColor = data.taskListColor;
  }

  get ListTemplate() {
    return /*html*/ `
    <div class="col-lg-4 p5 mb-3">
      <div class="card bg-white task-list shadow">
        <div
          class="colored-area p-3 text-center"
          style="background-color: ${this.taskListColor}"
        >
          <i
            class="fa-regular fa-square-minus top-delete-button font-black-transparent selectable"
            onclick="app.taskListsController.deleteTaskList('${this.taskListID}', '${this.taskListColor}')"
          ></i>
          <h3 class="font-black-transparent no-select">${this.taskListName}</h3>
          <h6 class="font-black-transparent no-select">x tasks left</h6>
        </div>

        <div class="card-body d-flex flex-column justify-content-between">
          <div id="tasks">
            <div
              class="task d-flex align-items-center justify-content-between mb-2"
            >
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input me-3"
                  type="checkbox"
                  name="isTaskComplete"
                  value="option1"
                />
                <label class="form-check-label" for="isTaskComplete"
                  >This is your task</label
                >
              </div>
              <i
                class="fa-regular fa-square-minus task-delete-button font-black-transparent selectable"
                onclick=""
                style="color: ${this.taskListColor}"
              ></i>
            </div>
          </div>
          <form class="d-flex justify-content-between" onsubmit="">
            <input
              type="text"
              class="task-name-input"
              name="taskName"
              placeholder="New task"
              minlength="3"
              maxlength="25"
              style="--task-color: ${this.taskListColor}"
              required
            />
            <button
            type="submit"
            class="icon-submit-container"
            style="color: ${this.taskListColor}"
            >
            <i class="fa-regular fa-square-plus task-submit"></i>
            </button>
            <input type="hidden" name="taskColor" value="${this.taskListColor}"/>
            <input type="hidden" name="taskListID" value="${this.taskListID}" />
          </form>
        </div>
      </div>
    </div>
    `;
  }

  get Tasks() {
    let tasks = appState.tasks.filter(
      (task) => task.taskListID == this.taskListID
    );
    return tasks;
  }

  get TasksTemplate() {
    let template = "";

    for (let task of this.Tasks) {
      template += task.TaskTemplate;
    }

    return template;
  }
}
