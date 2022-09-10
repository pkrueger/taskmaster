import { generateId } from "../Utils/generateId.js";

export class Task {
  /**
   *
   * @param {{taskID:string, taskName:string, taskColor:string, taskListID:string}} data
   */
  constructor(data) {
    this.taskID = data.taskID || generateId();
    this.taskName = data.taskName;
    this.taskColor = data.taskColor;
    this.taskListID = data.taskListID;
  }

  get taskTemplate() {
    return /*html*/ `
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
            >${this.taskName}</label
          >
        </div>
        <i
          class="fa-regular fa-square-minus task-delete-button font-black-transparent selectable"
          onclick="app.taskController.removeTask('${this.taskID}')"
          style="color: ${this.taskColor}"
        ></i>
      </div>
    `;
  }
}
