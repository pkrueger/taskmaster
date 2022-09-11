import { appState } from "../AppState.js";
import { generateId } from "../Utils/generateId.js";
import { Pop } from "../Utils/Pop.js";

export class TaskList {
  /**
   *
   * @param {{taskListID:string, taskListName:string, taskListColor:string, showToast: boolean}} data
   */
  constructor(data) {
    this.taskListID = data.taskListID || generateId();
    this.taskListName = data.taskListName;
    this.taskListColor = data.taskListColor;
    this.showToast = data.showToast || true;
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
            onclick="app.taskListsController.deleteTaskList('${
              this.taskListID
            }', '${this.taskListColor}')"
          ></i>
          <h3 class="font-black-transparent no-select">${this.taskListName}</h3>
          <h6 class="font-black-transparent no-select">${
            this.TasksIncomplete
          } task${this.TasksIncomplete == 1 ? "" : "s"} left</h6>
        </div>

        <div class="card-body d-flex flex-column justify-content-between">
          <ul id="tasks">
            ${this.TasksTemplate}
          </ul>
          <form class="d-flex justify-content-between" onsubmit="app.tasksController.createTask()">
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
            <input type="hidden" name="taskColor" value="${
              this.taskListColor
            }"/>
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

  get TasksIncomplete() {
    let counter = 0;
    for (let task of this.Tasks) {
      if (!task.isComplete) {
        counter++;
      }
    }
    return counter;
  }
}
