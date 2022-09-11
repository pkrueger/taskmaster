import { generateId } from "../Utils/generateId.js";

export class Task {
  /**
   *
   * @param {{taskID:string, taskName:string, taskColor:string, taskListID:string, isComplete: boolean}} data
   */
  constructor(data) {
    this.taskID = data.taskID || generateId();
    this.taskName = data.taskName;
    this.taskColor = data.taskColor;
    this.taskListID = data.taskListID;
    this.isComplete = data.isComplete || false;
  }

  get TaskTemplate() {
    return /*html*/ `
      <div
        class="task d-flex align-items-center justify-content-between mb-2"
      >
        <div class="form-check form-check-inline" style="color:${
          this.taskColor
        }">
          <input
            class="form-check-input me-3"
            type="checkbox"
            name="isComplete"
            onchange="app.tasksController.toggleIsComplete('${this.taskID}')"
            ${this.isComplete ? "checked" : ""}
          />
          <label class="form-check-label task-text" for="isComplete" ${
            this.isComplete
              ? "style='text-decoration: line-through; text-decoration-color:" +
                this.taskColor +
                "'"
              : ""
          }
            >${this.taskName}</label
          >
        </div>
        <i
          class="fa-regular fa-square-minus task-delete-button font-black-transparent selectable"
          onclick="app.tasksController.deleteTask('${this.taskID}', '${
      this.taskColor
    }')"
          style="color: ${this.taskColor}"
        ></i>
      </div>
    `;
  }
}
